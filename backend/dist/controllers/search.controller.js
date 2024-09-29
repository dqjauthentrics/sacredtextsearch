"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const verse_1 = require("../entities/verse");
const text_analysis_1 = require("../components/text-analysis");
const translation_1 = require("../entities/translation");
const book_1 = require("../entities/book");
const tome_1 = require("../entities/tome");
const user_query_1 = require("../entities/user-query");
const book_chapter_verse_interface_1 = require("../interfaces/book-chapter-verse.interface");
const chapter_1 = require("../entities/chapter");
const common_1 = require("@nestjs/common");
const data_result_1 = require("../shared/interfaces/data-result");
const HttpStatus = require('http-status-codes');
const natural = require('natural');
let SearchController = class SearchController {
    constructor() {
        this.debug = true;
        this.dataSource = global.ServerConfig.dataSource;
        this.bookRepo = this.dataSource.getRepository(book_1.Book);
        this.chapterRepo = this.dataSource.getRepository(chapter_1.Chapter);
        this.verseRepo = this.dataSource.getRepository(verse_1.Verse);
        this.userQueryRepo = this.dataSource.getRepository(user_query_1.UserQuery);
    }
    list(offset, limit) {
        return this.verseRepo.count().then((totalCount) => {
            return this.verseRepo
                .find({ skip: offset, take: limit, relations: ['book'] })
                .then((verses) => {
                return new data_result_1.DataResult(totalCount, offset, limit, verses);
            })
                .catch((e) => {
                process.stderr.write(`${e}\n`);
            });
        });
    }
    async chapter(bookId, translationId, chapterNum, verseId) {
        let chapter = new chapter_1.Chapter();
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
                .then((verses) => {
                if (chapter) {
                    chapter.verses = verses;
                }
            })
                .catch((e) => {
                process.stderr.write(`${e}\n`);
            });
        }
        return new data_result_1.DataResult(chapter ? 1 : 0, 0, 1, chapter);
    }
    async verseTranslations(bookId, chapterNum, verseNum) {
        const sql = `CALL searchTranslations(${bookId}, ${chapterNum}, ${verseNum})`;
        return this.verseRepo.query(sql).then((rows) => {
            const hits = this.mapHits(rows);
            return new data_result_1.DataResult(hits.length, 0, hits.length, hits);
        });
    }
    async grid(post) {
        try {
            const originalQuery = post.query;
            const query = await this.clean(post.query);
            const isSpecific = query && (query.match(/:/g) || []).length === 2;
            const verse = undefined;
            const order = post.sort || 'zrank DESC';
            const translationIdStr = post.hardConstraints && post.hardConstraints.length > 0
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
            return this.verseRepo.query(countQuery).then((countResult) => {
                const totalCount = isSpecific
                    ? countResult[0][0].cnt
                    : countResult[0].cnt;
                return this.verseRepo
                    .query(searchQuery)
                    .then((rows) => {
                    const hits = this.mapHits(rows);
                    if (originalQuery && originalQuery.trim().length > 0) {
                        this.storeQuery(query, hits.length);
                    }
                    if (this.debug) {
                        console.log('  NUM HITS: ' + hits.length);
                        console.log('--------------------------------------------------------');
                    }
                    return new data_result_1.DataResult(totalCount, post.offset, post.size, hits, query, verse);
                })
                    .catch((exception) => {
                    process.stderr.write(`[query] ${exception}\n`);
                });
            });
        }
        catch (exception) {
            console.log('[search fail]', exception);
            return new data_result_1.DataResult(0, 0, 0, [], null, null, HttpStatus.BAD_REQUEST);
        }
    }
    async randomQuery() {
        let query = '';
        await this.verseRepo
            .query('select randomQuery() as q')
            .then((result) => {
            if (result && result[0]) {
                query = result[0].q;
            }
            if (!query || query.length === 0) {
                query = 'jonah whale';
            }
        });
        return query;
    }
    async clean(query) {
        if (query) {
            query = query
                .replace(/'/g, '')
                .replace(/"/g, '')
                .replace(/\\/g, '')
                .replace('///g', '');
        }
        return query || '';
    }
    async getBook(bcv) {
        let book = null;
        await this.bookRepo
            .findOne({ where: { name: bcv.book }, relations: ['tome'] })
            .then((bookRec) => {
            book = bookRec;
        })
            .catch((reason) => {
            console.log(`[getVerse:book] ${reason.toString()}`);
        });
        return book;
    }
    async getVerse(bookId, bcv) {
        let verse = null;
        await this.verseRepo
            .findOne({
            where: {
                chapterNumber: bcv.chapter,
                verseNumber: bcv.verse,
                bookId,
            },
        })
            .then((verseRec) => {
            verse = verseRec;
        })
            .catch((reason) => {
            console.log(`[getVerse:verse] ${reason.toString()}`);
        });
        return verse;
    }
    querify(ta, query) {
        const tokenizer = new natural.WordTokenizer();
        let words = tokenizer.tokenize(query.toLowerCase());
        if (words) {
            words = ta.strip(words);
        }
        return words ? words.join(' ') : '';
    }
    async parseQuery(query) {
        const ta = new text_analysis_1.TextAnalysis();
        const bcv = new book_chapter_verse_interface_1.BookChapterVerse();
        let verse = null;
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
    getOrdering(data) {
        let ordering = '';
        if (data && data.order) {
            for (let i = 0; i < data.order.length; i++) {
                const col = data.order[i].column;
                let dir = data.order[i].direction;
                if (col) {
                    const colName = col.replace('verse.', '').replace('.', '_');
                    dir = dir && dir.length > 0 ? ' ' + dir.toUpperCase() : ' ASC';
                    ordering += colName + dir;
                }
            }
        }
        return ordering.length > 0 ? ordering : 'zrank DESC';
    }
    storeQuery(searchQuery, n_hits) {
        try {
            this.userQueryRepo
                .findOne({ where: { terms: searchQuery } })
                .then((rec) => {
                if (!rec) {
                    rec = new user_query_1.UserQuery();
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
        }
        catch (exception) {
            console.log('[store error]', exception);
        }
    }
    mapHits(rows) {
        const hits = [];
        try {
            for (let i = 0; i < rows[0].length; i++) {
                const row = rows[0][i];
                const tome = new tome_1.Tome();
                tome.id = row.tome_id;
                tome.religionId = row.religion_id;
                tome.name = row.tome_name;
                const book = new book_1.Book();
                book.id = row.book_id;
                book.name = row.book_name;
                book.tomeId = row.tome_id;
                book.tome = tome;
                const translation = new translation_1.Translation();
                translation.id = row.translation_id;
                translation.abbreviation = row.trans_abbrev;
                translation.name = row.trans_name;
                translation.publisher = row.publisher;
                translation.infoUrl = row.info_url;
                translation.screenshotUrl = row.screenshot_url;
                const verse = new verse_1.Verse();
                verse.id = row.id;
                verse.body = row.body;
                verse.book = book;
                verse.chapterNumber = row.chapter_number;
                verse.verseNumber = row.verse_number;
                verse.translation = translation;
                hits.push({
                    verse: verse,
                    score: row.score,
                    rank: Math.round(row.zrank),
                    violence: Math.round(row.violence),
                    myth: Math.round(row.myth),
                    submission: Math.round(row.submission),
                    chapterTitle: row.chapterTitle,
                    chapterName: row.chapterName,
                });
            }
        }
        catch (exception) {
            console.log('[map error]', exception);
        }
        return hits;
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)('/list/:offset/:limit'),
    __param(0, (0, common_1.Param)('offset')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/chapter/:bookId/:translationId/:chapterNum/:verseId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Param)('translationId')),
    __param(2, (0, common_1.Param)('chapterNum')),
    __param(3, (0, common_1.Param)('verseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "chapter", null);
__decorate([
    (0, common_1.Get)('/verseTranslations/:bookId/:chapterNum/:verseNum'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Param)('chapterNum')),
    __param(2, (0, common_1.Param)('verseNum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "verseTranslations", null);
__decorate([
    (0, common_1.Post)('/grid'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "grid", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('/search'),
    __metadata("design:paramtypes", [])
], SearchController);
//# sourceMappingURL=search.controller.js.map