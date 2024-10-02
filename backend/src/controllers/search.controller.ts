import { DataSource, Repository } from 'typeorm';
import { Verse } from '../entities/verse';
import { TextAnalysis } from '../components/text-analysis';
import { Translation } from '../entities/translation';
import { Book } from '../entities/book';
import { Tome } from '../entities/tome';
import { QueryInterface } from '../interfaces/query.interface';
import { UserQuery } from '../entities/user-query';
import {
  BookChapterVerse,
  BookChapterVerseInterface,
} from '../interfaces/book-chapter-verse.interface';
import { GridPostInterface } from '../interfaces/grid-post.interface';
import { Chapter } from '../entities/chapter';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DataResult } from '../shared/interfaces/data-result';
import {SearchResultInterface} from '../shared/interfaces/search-result.interface';

const HttpStatus = require('http-status-codes');
const natural = require('natural');

@Controller('/search')
export class SearchController {
  private debug = true;
  private bookRepo: Repository<Book>;
  private chapterRepo: Repository<Chapter>;
  private verseRepo: Repository<Verse>;
  private userQueryRepo: Repository<UserQuery>;
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = global.ServerConfig.dataSource;
    this.bookRepo = this.dataSource.getRepository(Book);
    this.chapterRepo = this.dataSource.getRepository(Chapter);
    this.verseRepo = this.dataSource.getRepository(Verse);
    this.userQueryRepo = this.dataSource.getRepository(UserQuery);
  }

  @Get('/list/:offset/:limit')
  list(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.verseRepo.count().then((totalCount: any) => {
      return this.verseRepo
        .find({ skip: offset, take: limit, relations: ['book'] })
        .then((verses: Array<Verse>) => {
          return new DataResult<Verse>(totalCount, offset, limit, verses);
        })
        .catch((e) => {
          process.stderr.write(`${e}\n`);
        });
    });
  }

  @Get('/chapter/:bookId/:translationId/:chapterNum/:verseId')
  async chapter(
    @Param('bookId') bookId: number,
    @Param('translationId') translationId: number,
    @Param('chapterNum') chapterNum: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('verseId', ParseIntPipe) verseId: number,
  ) {
    let chapter: Chapter = new Chapter();
    chapter.id = 0;
    chapter.bookId = bookId;
    chapter.chapterNumber = chapterNum;
    chapter.translationId = translationId;
    chapter.name = '';
    chapter.title = '';
    await this.chapterRepo
      .findOne({
        where: {
          bookId: bookId,
          translationId: translationId,
          chapterNumber: chapterNum,
        },
      })
      .then((resultChapter) => {
        if (resultChapter) {
          chapter = resultChapter;
        }
      });
    if (chapter) {
      await this.verseRepo
        .find({
          where: {
            bookId: bookId,
            translationId: translationId,
            chapterNumber: chapterNum,
          },
          order: { verseNumber: 'ASC' },
        })
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
  async verseTranslations(
    @Param('bookId') bookId: number,
    @Param('chapterNum') chapterNum: number,
    @Param('verseNum') verseNum: number,
  ) {
    const sql = `CALL searchTranslations(${bookId}, ${chapterNum}, ${verseNum})`;
    return this.verseRepo.query(sql).then((rows: any) => {
      const hits = this.mapHits(rows);
      return new DataResult(hits.length, 0, hits.length, hits);
    });
  }

  @Post('/grid')
  async grid(@Body() post: GridPostInterface) {
    // this.debug = true;
    try {
      const originalQuery = post.query;
      const query = await this.clean(post.query);
      const isSpecific = query && (query.match(/:/g) || []).length === 2;
      const verse: Verse | undefined = undefined;
      const order: string = post.sort || 'zrankNormalized DESC';
      const translationIdStr =
        post.hardConstraints && post.hardConstraints.length > 0
          ? post.hardConstraints[0].value.join(',')
          : '';
      let bookName = '';
      let chNum = 0;
      let vsNum = 0;
      if (isSpecific) {
        const parts = query.split(':');
        bookName = parts[0];
        chNum = parseInt(parts[1]);
        vsNum = parseInt(parts[2]);
      }

      const countQuery = isSpecific
        ? `CALL searchSpecificVerseCount('${bookName}', '${chNum}','${vsNum}', '${translationIdStr}')`
        : `SELECT searchVerseCount('${query}', '${translationIdStr}') AS cnt`;
      const searchQuery = isSpecific
        ? `CALL searchSpecificVerses('${bookName}', '${chNum}','${vsNum}', '${translationIdStr}', ${post.offset}, ${post.size}, '${order}')`
        : `CALL searchVerses('${query}', '${translationIdStr}', ${post.offset}, ${post.size}, '${order}')`;

      if (this.debug) {
        console.log('   POSTED QUERY: ' + post.query);
        console.log('       ORDERING: ' + order);
        console.log('  CLEANED QUERY: ' + query);
        console.log('TRANSLATION IDS: ' + translationIdStr);
        console.log('       SQL CALL: ' + searchQuery);
      }
      return this.verseRepo.query(countQuery).then((countResult: any) => {
        const totalCount = isSpecific
          ? countResult[0][0].cnt
          : countResult[0].cnt;
        return this.verseRepo
          .query(searchQuery)
          .then((rows: any) => {
            const hits: Array<SearchResultInterface> = this.mapHits(rows);
            if (originalQuery && originalQuery.trim().length > 0) {
              this.storeQuery(query, hits.length);
            }
            if (this.debug) {
              console.log('  NUM HITS: ' + hits.length);
              console.log(
                '--------------------------------------------------------',
              );
            }
            return new DataResult<SearchResultInterface>(
              totalCount,
              post.offset,
              post.size,
              hits,
              query,
              verse,
            );
          })
          .catch((exception) => {
            process.stderr.write(`[query] ${exception}\n`);
          });
      });
    } catch (exception) {
      console.log('[search fail]', exception);
      return new DataResult<SearchResultInterface>(
        0,
        0,
        0,
        [],
        null,
        null,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async randomQuery(): Promise<string> {
    let query = '';
    await this.verseRepo
      .query('select randomQuery() as q')
      .then((result: any) => {
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
        .replace('///g', '');
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
    await this.bookRepo
      .findOne({ where: { name: bcv.book }, relations: ['tome'] })
      .then((bookRec: any) => {
        book = bookRec;
      })
      .catch((reason) => {
        console.log(`[getVerse:book] ${reason.toString()}`);
      });
    return book;
  }

  private async getVerse(
    bookId: number,
    bcv: BookChapterVerseInterface,
  ): Promise<Verse | null> {
    let verse: Verse | null = null;
    await this.verseRepo
      .findOne({
        where: {
          chapterNumber: bcv.chapter,
          verseNumber: bcv.verse,
          bookId,
        },
      })
      .then((verseRec: any) => {
        verse = verseRec;
      })
      .catch((reason) => {
        console.log(`[getVerse:verse] ${reason.toString()}`);
      });
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
      const book = await this.getBook(bookChapterVerse).then();
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
    return { query: query, verse: verse };
  }

  private getOrdering(data: QueryInterface): string {
    let ordering = '';
    if (data && data.order) {
      for (let i = 0; i < data.order.length; i++) {
        const col = data.order[i].column;
        let dir = data.order[i].direction;
        if (col) {
          const colName = col.replace('verse.', '').replace('.', '_'); // e.g., 'book.name' => 'book_name'
          dir = dir && dir.length > 0 ? ' ' + dir.toUpperCase() : ' ASC';
          ordering += colName + dir;
        }
      }
    }
    return ordering.length > 0 ? ordering : 'zrankNormalized DESC';
  }

  private storeQuery(searchQuery: string, n_hits: number) {
    try {
      this.userQueryRepo
        .findOne({ where: { terms: searchQuery } })
        .then((rec) => {
          if (!rec) {
            rec = new UserQuery();
            rec.terms = searchQuery.substr(0, 200);
          }
          if (rec) {
            if (!rec.usageCount) {
              rec.usageCount = 0;
            }
            rec.usageCount += 1;
            rec.nHits = n_hits;
            this.userQueryRepo.save(rec).then();
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
    const hits: Array<SearchResultInterface> = [];
    try {
      for (let i = 0; i < rows[0].length; i++) {
        const row = rows[0][i];

        const tome = new Tome();
        tome.id = row.tome_id;
        tome.religionId = row.religion_id;
        tome.name = row.tome_name;

        const book = new Book();
        book.id = row.book_id;
        book.name = row.book_name;
        book.tomeId = row.tome_id;
        book.tome = tome;

        const translation = new Translation();
        translation.id = row.translation_id;
        translation.abbreviation = row.trans_abbrev;
        translation.name = row.trans_name;
        translation.publisher = row.publisher;
        translation.infoUrl = row.info_url;
        translation.screenshotUrl = row.screenshot_url;

        const verse = new Verse();
        verse.id = row.id;
        verse.body = row.body;
        verse.book = book;
        verse.chapterNumber = row.chapter_number;
        verse.verseNumber = row.verse_number;
        verse.translation = translation;

        hits.push({
          verse: verse,
          score: row.score,
          zrank: row.zrank,
          zrankNormalized: row.zrankNormalized,
          combinedRank: row.combinedRank,
          violence: Math.round(row.violence),
          myth: Math.round(row.myth),
          submission: Math.round(row.submission),
          chapterTitle: row.chapterTitle,
          chapterName: row.chapterName,
        });
      }
    } catch (exception) {
      console.log('[map error]', exception);
    }
    return hits;
  }
}
