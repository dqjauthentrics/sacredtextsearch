import {Body, Get, JsonController, OnUndefined, Param, Post} from 'routing-controllers';
import {getConnection, Repository} from 'typeorm';
import {Verse} from '../entities/Verse';
import {DataResult} from '../entities/DataResult';
import {TextAnalysis} from '../components/text-analysis';
import {Translation} from '../entities/Translation';
import {Book} from '../entities/Book';
import {Tome} from '../entities/Tome';
import {QueryInterface} from '../interfaces/query.interface';
import {SearchResultInterface} from '../interfaces/search-result.interface';
import {UserQuery} from '../entities/UserQuery';
import {BookChapterVerse, BookChapterVerseInterface} from '../interfaces/book-chapter-verse.interface';
import {GridPostInterface} from '../interfaces/grid-post.interface';
import {Chapter} from '../entities/Chapter';

const HttpStatus = require('http-status-codes');
const natural = require('natural');

@JsonController('/search')
export class SearchController {
	private debug = false;
	private bookRepo: Repository<Book>;
	private chapterRepo: Repository<Chapter>;
	private verseRepo: Repository<Verse>;
	private userQueryRepo: Repository<UserQuery>;

	constructor() {
		this.bookRepo = getConnection().getRepository(Book);
		this.chapterRepo = getConnection().getRepository(Chapter);
		this.verseRepo = getConnection().getRepository(Verse);
		this.userQueryRepo = getConnection().getRepository(UserQuery);
	}

	@Get('/list/:offset/:limit')
	@OnUndefined(404)
	list(@Param('offset') offset: number, @Param('limit') limit: number) {
		return this.verseRepo.count().then((totalCount: any) => {
			return this.verseRepo.find({skip: offset, take: limit, relations: ['book']})
					   .then((verses: Array<Verse>) => {
						   return new DataResult<Verse>(totalCount, offset, limit, verses);
					   })
					   .catch((e) => {
						   process.stderr.write(`${e}\n`);
					   });
		});
	}

	@Get('/chapter/:bookId/:translationId/:chapterNum/:verseId')
	@OnUndefined(404)
	async chapter(@Param('bookId') bookId: number, @Param('translationId') translationId: number, @Param('chapterNum') chapterNum: number, @Param('verseId') verseId: number) {
		let chapter: Chapter = new Chapter();
		chapter.id = 0;
		chapter.book_id = bookId;
		chapter.chapter_number = chapterNum;
		chapter.translation_id = translationId;
		chapter.name = '';
		chapter.title = '';
		await this.chapterRepo.findOne({where: {book_id: bookId, translation_id: translationId, chapter_number: chapterNum}})
				  .then((resultChapter) => {
					  if (resultChapter) {
						  console.log('resultChapter', resultChapter);
						  chapter = resultChapter;
					  }
				  });
		if (chapter) {
			await this.verseRepo
					  .find({where: {book_id: bookId, translation_id: translationId, chapter_number: chapterNum}, order: {verse_number: 'ASC'}})
					  .then((verses: Array<Verse>) => {
						  if (chapter) {
							  chapter.verses = verses;
						  }
					  })
					  .catch((e) => {
						  process.stderr.write(`${e}\n`);
					  });
		}
		return new DataResult<Chapter>(chapter ? 1 : 0, 0, 1, chapter);
	}

	@Get('/verseTranslations/:bookId/:chapterNum/:verseNum')
	@OnUndefined(404)
	async verseTranslations(@Param('bookId') bookId: number, @Param('chapterNum') chapterNum: number, @Param('verseNum') verseNum: number) {
		const sql = `CALL searchTranslations(${bookId}, ${chapterNum}, ${verseNum})`;
		return this.verseRepo.query(sql).then((rows: any) => {
			return this.mapHits(rows);
		});
	}

	@Post('/grid')
	@OnUndefined(404)
	async grid(@Body() post: GridPostInterface) {
		// this.debug = true;
		try {
			const originalQuery = post.query;
			const query = await this.clean(post.query);
			const isSpecific = query && (query.match(/:/g) || []).length === 2;
			const verse: string | null = null;
			const order: string = post.sort || 'rank DESC';
			const translationIdStr = post.hardConstraints && post.hardConstraints.length > 0 ? post.hardConstraints[0].value.join(',') : '';

			let bookName = '';
			let chNum = 0;
			let vsNum = 0;
			if (isSpecific) {
				const parts = query.split(':');
				bookName = parts[0];
				chNum = parseInt(parts[1]);
				vsNum = parseInt(parts[2]);
			}

			const countQuery = isSpecific ?
							   `CALL searchSpecificVerseCount('${bookName}', '${chNum}','${vsNum}', '${translationIdStr}')` :
							   `SELECT searchVerseCount('${query}', '${translationIdStr}') AS cnt`;
			const searchQuery = isSpecific ?
								`CALL searchSpecificVerses('${bookName}', '${chNum}','${vsNum}', '${translationIdStr}', ${post.offset}, ${post.size}, '${order}')` :
								`CALL searchVerses('${query}', '${translationIdStr}', ${post.offset}, ${post.size}, '${order}')`;

			if (this.debug) {
				console.log('   POSTED QUERY: ' + post.query);
				console.log('       ORDERING: ' + order);
				console.log('  CLEANED QUERY: ' + query);
				console.log('TRANSLATION IDS: ' + translationIdStr);
				console.log('       SQL CALL: ' + searchQuery);
			}
			return this.verseRepo.query(countQuery).then((countResult: any) => {
				const totalCount = isSpecific ? countResult[0][0].cnt : countResult[0].cnt;
				return this.verseRepo.query(searchQuery)
						   .then((rows: any) => {
							   const hits: Array<SearchResultInterface> = this.mapHits(rows);
							   if (originalQuery && originalQuery.trim().length > 0) {
								   this.storeQuery(query, hits.length);
							   }
							   if (this.debug) {
								   console.log('  NUM HITS: ' + hits.length);
								   console.log('--------------------------------------------------------');
							   }
							   return new DataResult<SearchResultInterface>(totalCount, post.offset, post.size, hits, query, verse);
						   })
						   .catch((exception) => {
							   process.stderr.write(`[query] ${exception}\n`);
						   });
			});
		} catch (exception) {
			console.log('[search fail]', exception);
			return new DataResult<SearchResultInterface>(0, 0, 0, [], null, null, HttpStatus.BAD_REQUEST);
		}
	}

	async randomQuery(): Promise<string> {
		let query = '';
		await this.verseRepo.query('select randomQuery() as q').then((result: any) => {
			if (result && result[0]) {
				query = result[0].q;
			}
			if (!query || query.length === 0) {
				query = 'jonah whale'; // failsafe
			}
		});
		return query;
	}

	async clean(query: string | null | undefined): Promise<string> {
		if (query) {
			query = query
				.replace(/'/g, '')
				.replace(/"/g, '')
				.replace(/\\/g, '')
				.replace('/\//g', '');
		}
		// if (!query || query.length === 0) {
		//     await this.randomQuery().then((q: string) => {
		//         query = q;
		//     })
		// }
		return query || '';
	}

	private async getBook(bcv: BookChapterVerseInterface): Promise<Book | null> {
		let book: Book | null = null;
		await this.bookRepo.findOne({where: {name: bcv.book}, relations: ['tome']})
				  .then((bookRec: any) => {
					  book = bookRec;
				  })
				  .catch((reason => {
					  console.log(`[getVerse:book] ${reason.toString()}`)
				  }));
		return book;
	}

	private async getVerse(bookId: number, bcv: BookChapterVerseInterface): Promise<Verse | null> {
		let verse: Verse | null = null;
		await this.verseRepo.findOne({where: {chapter_number: bcv.chapter, verse_number: bcv.verse, book_id: bookId}})
				  .then((verseRec: any) => {
					  verse = verseRec;
				  })
				  .catch((reason => {
					  console.log(`[getVerse:verse] ${reason.toString()}`)
				  }));
		return verse;
	}

	private querify(ta: TextAnalysis, query: string) {
		const tokenizer = new natural.WordTokenizer();
		let words = tokenizer.tokenize(query.toLowerCase());
		if (words) {
			words = ta.strip(words);
		}
		return words ? words.join(' ') : '';
	}

	private async parseQuery(query: string) {
		const ta = new TextAnalysis();
		const bcv = new BookChapterVerse();
		let verse: Verse | null = null;
		query = query.trim();
		const bookChapterVerse = bcv.parse(query);
		if (this.debug) {
			console.log('    C/S/V:', bookChapterVerse);
		}
		if (bookChapterVerse) {
			let book = await this.getBook(bookChapterVerse).then();
			if (book) {
				if (this.debug) {
					console.log('         BOOK: ', book.name);
				}
				verse = await this.getVerse(book.id, bookChapterVerse).then();
				if (verse) {
					if (this.debug) {
						console.log('        VERSE: ', verse.body);
					}
					verse.book = book;
				}
			}
		}
		query = this.querify(ta, verse ? verse.body : query);
		return {query: query, verse: verse};
	}

	private getOrdering(data: QueryInterface): string {
		let ordering = '';
		if (data && data.order) {
			for (let i = 0; i < data.order.length; i++) {
				let col = data.order[i].column;
				let dir = data.order[i].direction;
				if (col) {
					const colName = col.replace('verse.', '').replace('.', '_'); // e.g., 'book.name' => 'book_name'
					dir = dir && dir.length > 0 ? ' ' + dir.toUpperCase() : ' ASC';
					ordering += colName + dir;
				}
			}
		}
		return ordering.length > 0 ? ordering : 'rank DESC';
	}

	private storeQuery(searchQuery: string, n_hits: number) {
		try {
			this.userQueryRepo.findOne({where: {'terms': searchQuery}})
				.then((rec) => {
					if (!rec) {
						rec = new UserQuery();
						rec.terms = searchQuery.substr(0, 200);
					}
					if (rec) {
						if (!rec.usage_count) {
							rec.usage_count = 0;
						}
						rec.usage_count += 1;
						rec.n_hits = n_hits;
						rec.save();
					}
				})
				.catch((exception) => {
					process.stderr.write(`[storeQuery]: ${exception}`);
				});
		} catch (exception) {
			console.log('[store error]', exception);
		}
	}

	private mapHits(rows: Array<any>): Array<SearchResultInterface> {
		let hits: Array<SearchResultInterface> = [];
		try {
			for (let i = 0; i < rows[0].length; i++) {
				const row = rows[0][i];

				const tome = new Tome();
				tome.id = row.tome_id;
				tome.religion_id = row.religion_id;
				tome.name = row.tome_name;

				const book = new Book();
				book.id = row.book_id;
				book.name = row.book_name;
				book.tome_id = row.tome_id;
				book.tome = tome;

				const translation = new Translation();
				translation.id = row.translation_id;
				translation.abbreviation = row.trans_abbrev;
				translation.name = row.trans_name;
				translation.publisher = row.publisher;
				translation.info_url = row.info_url;
				translation.screenshot_url = row.screenshot_url;

				const verse = new Verse();
				verse.id = row.id;
				verse.body = row.body;
				verse.book = book;
				verse.chapter_number = row.chapter_number;
				verse.verse_number = row.verse_number;
				verse.translation = translation;

				hits.push({
					verse: verse,
					score: row.score,
					rank: Math.round(row.rank),
					violence: Math.round(row.violence),
					myth: Math.round(row.myth),
					submission: Math.round(row.submission),
					chapterTitle: row.chapterTitle,
					chapterName: row.chapterName
				});
			}
		} catch (exception) {
			console.log('[map error]', exception);
		}
		return hits;
	}
}
