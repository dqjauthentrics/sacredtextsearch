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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var Verse_1 = require("../entities/Verse");
var DataResult_1 = require("../entities/DataResult");
var text_analysis_1 = require("../components/text-analysis");
var Translation_1 = require("../entities/Translation");
var Book_1 = require("../entities/Book");
var Tome_1 = require("../entities/Tome");
var UserQuery_1 = require("../entities/UserQuery");
var book_chapter_verse_interface_1 = require("../interfaces/book-chapter-verse.interface");
var Chapter_1 = require("../entities/Chapter");
var HttpStatus = require('http-status-codes');
var natural = require('natural');
var SearchController = /** @class */ (function () {
    function SearchController() {
        this.debug = false;
        this.bookRepo = typeorm_1.getConnection().getRepository(Book_1.Book);
        this.chapterRepo = typeorm_1.getConnection().getRepository(Chapter_1.Chapter);
        this.verseRepo = typeorm_1.getConnection().getRepository(Verse_1.Verse);
        this.userQueryRepo = typeorm_1.getConnection().getRepository(UserQuery_1.UserQuery);
    }
    SearchController.prototype.list = function (offset, limit) {
        var _this = this;
        return this.verseRepo.count().then(function (totalCount) {
            return _this.verseRepo.find({ skip: offset, take: limit, relations: ['book'] })
                .then(function (verses) {
                return new DataResult_1.DataResult(totalCount, offset, limit, verses);
            })
                .catch(function (e) {
                process.stderr.write(e + "\n");
            });
        });
    };
    SearchController.prototype.chapter = function (bookId, translationId, chapterNum, verseId) {
        return __awaiter(this, void 0, void 0, function () {
            var chapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chapter = new Chapter_1.Chapter();
                        chapter.id = 0;
                        chapter.book_id = bookId;
                        chapter.chapter_number = chapterNum;
                        chapter.translation_id = translationId;
                        chapter.name = '';
                        chapter.title = '';
                        return [4 /*yield*/, this.chapterRepo.findOne({ where: { book_id: bookId, translation_id: translationId, chapter_number: chapterNum } })
                                .then(function (resultChapter) {
                                if (resultChapter) {
                                    console.log('resultChapter', resultChapter);
                                    chapter = resultChapter;
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!chapter) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.verseRepo
                                .find({ where: { book_id: bookId, translation_id: translationId, chapter_number: chapterNum }, order: { verse_number: 'ASC' } })
                                .then(function (verses) {
                                if (chapter) {
                                    chapter.verses = verses;
                                }
                            })
                                .catch(function (e) {
                                process.stderr.write(e + "\n");
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, new DataResult_1.DataResult(chapter ? 1 : 0, 0, 1, chapter)];
                }
            });
        });
    };
    SearchController.prototype.verseTranslations = function (bookId, chapterNum, verseNum) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            var _this = this;
            return __generator(this, function (_a) {
                sql = "CALL searchTranslations(" + bookId + ", " + chapterNum + ", " + verseNum + ")";
                return [2 /*return*/, this.verseRepo.query(sql).then(function (rows) {
                        return _this.mapHits(rows);
                    })];
            });
        });
    };
    SearchController.prototype.grid = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var originalQuery_1, query_1, isSpecific_1, verse_1, order, translationIdStr, bookName, chNum, vsNum, parts, countQuery, searchQuery_1, exception_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        originalQuery_1 = post.query;
                        return [4 /*yield*/, this.clean(post.query)];
                    case 1:
                        query_1 = _a.sent();
                        isSpecific_1 = query_1 && (query_1.match(/:/g) || []).length === 2;
                        verse_1 = null;
                        order = post.sort || 'rank DESC';
                        translationIdStr = post.hardConstraints && post.hardConstraints.length > 0 ? post.hardConstraints[0].value.join(',') : '';
                        bookName = '';
                        chNum = 0;
                        vsNum = 0;
                        if (isSpecific_1) {
                            parts = query_1.split(':');
                            bookName = parts[0];
                            chNum = parseInt(parts[1]);
                            vsNum = parseInt(parts[2]);
                        }
                        countQuery = isSpecific_1 ?
                            "CALL searchSpecificVerseCount('" + bookName + "', '" + chNum + "','" + vsNum + "', '" + translationIdStr + "')" :
                            "SELECT searchVerseCount('" + query_1 + "', '" + translationIdStr + "') AS cnt";
                        searchQuery_1 = isSpecific_1 ?
                            "CALL searchSpecificVerses('" + bookName + "', '" + chNum + "','" + vsNum + "', '" + translationIdStr + "', " + post.offset + ", " + post.size + ", '" + order + "')" :
                            "CALL searchVerses('" + query_1 + "', '" + translationIdStr + "', " + post.offset + ", " + post.size + ", '" + order + "')";
                        if (this.debug) {
                            console.log('   POSTED QUERY: ' + post.query);
                            console.log('       ORDERING: ' + order);
                            console.log('  CLEANED QUERY: ' + query_1);
                            console.log('TRANSLATION IDS: ' + translationIdStr);
                            console.log('       SQL CALL: ' + searchQuery_1);
                        }
                        return [2 /*return*/, this.verseRepo.query(countQuery).then(function (countResult) {
                                var totalCount = isSpecific_1 ? countResult[0][0].cnt : countResult[0].cnt;
                                return _this.verseRepo.query(searchQuery_1)
                                    .then(function (rows) {
                                    var hits = _this.mapHits(rows);
                                    if (originalQuery_1 && originalQuery_1.trim().length > 0) {
                                        _this.storeQuery(query_1, hits.length);
                                    }
                                    if (_this.debug) {
                                        console.log('  NUM HITS: ' + hits.length);
                                        console.log('--------------------------------------------------------');
                                    }
                                    return new DataResult_1.DataResult(totalCount, post.offset, post.size, hits, query_1, verse_1);
                                })
                                    .catch(function (exception) {
                                    process.stderr.write("[query] " + exception + "\n");
                                });
                            })];
                    case 2:
                        exception_1 = _a.sent();
                        console.log('[search fail]', exception_1);
                        return [2 /*return*/, new DataResult_1.DataResult(0, 0, 0, [], null, null, HttpStatus.BAD_REQUEST)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SearchController.prototype.randomQuery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = '';
                        return [4 /*yield*/, this.verseRepo.query('select randomQuery() as q').then(function (result) {
                                if (result && result[0]) {
                                    query = result[0].q;
                                }
                                if (!query || query.length === 0) {
                                    query = 'jonah whale'; // failsafe
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, query];
                }
            });
        });
    };
    SearchController.prototype.clean = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/, query || ''];
            });
        });
    };
    SearchController.prototype.getBook = function (bcv) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        book = null;
                        return [4 /*yield*/, this.bookRepo.findOne({ where: { name: bcv.book }, relations: ['tome'] })
                                .then(function (bookRec) {
                                book = bookRec;
                            })
                                .catch((function (reason) {
                                console.log("[getVerse:book] " + reason.toString());
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, book];
                }
            });
        });
    };
    SearchController.prototype.getVerse = function (bookId, bcv) {
        return __awaiter(this, void 0, void 0, function () {
            var verse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verse = null;
                        return [4 /*yield*/, this.verseRepo.findOne({ where: { chapter_number: bcv.chapter, verse_number: bcv.verse, book_id: bookId } })
                                .then(function (verseRec) {
                                verse = verseRec;
                            })
                                .catch((function (reason) {
                                console.log("[getVerse:verse] " + reason.toString());
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, verse];
                }
            });
        });
    };
    SearchController.prototype.querify = function (ta, query) {
        var tokenizer = new natural.WordTokenizer();
        var words = tokenizer.tokenize(query.toLowerCase());
        if (words) {
            words = ta.strip(words);
        }
        return words ? words.join(' ') : '';
    };
    SearchController.prototype.parseQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var ta, bcv, verse, bookChapterVerse, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ta = new text_analysis_1.TextAnalysis();
                        bcv = new book_chapter_verse_interface_1.BookChapterVerse();
                        verse = null;
                        query = query.trim();
                        bookChapterVerse = bcv.parse(query);
                        if (this.debug) {
                            console.log('    C/S/V:', bookChapterVerse);
                        }
                        if (!bookChapterVerse) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getBook(bookChapterVerse).then()];
                    case 1:
                        book = _a.sent();
                        if (!book) return [3 /*break*/, 3];
                        if (this.debug) {
                            console.log('         BOOK: ', book.name);
                        }
                        return [4 /*yield*/, this.getVerse(book.id, bookChapterVerse).then()];
                    case 2:
                        verse = _a.sent();
                        if (verse) {
                            if (this.debug) {
                                console.log('        VERSE: ', verse.body);
                            }
                            verse.book = book;
                        }
                        _a.label = 3;
                    case 3:
                        query = this.querify(ta, verse ? verse.body : query);
                        return [2 /*return*/, { query: query, verse: verse }];
                }
            });
        });
    };
    SearchController.prototype.getOrdering = function (data) {
        var ordering = '';
        if (data && data.order) {
            for (var i = 0; i < data.order.length; i++) {
                var col = data.order[i].column;
                var dir = data.order[i].direction;
                if (col) {
                    var colName = col.replace('verse.', '').replace('.', '_'); // e.g., 'book.name' => 'book_name'
                    dir = dir && dir.length > 0 ? ' ' + dir.toUpperCase() : ' ASC';
                    ordering += colName + dir;
                }
            }
        }
        return ordering.length > 0 ? ordering : 'rank DESC';
    };
    SearchController.prototype.storeQuery = function (searchQuery, n_hits) {
        try {
            this.userQueryRepo.findOne({ where: { 'terms': searchQuery } })
                .then(function (rec) {
                if (!rec) {
                    rec = new UserQuery_1.UserQuery();
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
                .catch(function (exception) {
                process.stderr.write("[storeQuery]: " + exception);
            });
        }
        catch (exception) {
            console.log('[store error]', exception);
        }
    };
    SearchController.prototype.mapHits = function (rows) {
        var hits = [];
        try {
            for (var i = 0; i < rows[0].length; i++) {
                var row = rows[0][i];
                var tome = new Tome_1.Tome();
                tome.id = row.tome_id;
                tome.religion_id = row.religion_id;
                tome.name = row.tome_name;
                var book = new Book_1.Book();
                book.id = row.book_id;
                book.name = row.book_name;
                book.tome_id = row.tome_id;
                book.tome = tome;
                var translation = new Translation_1.Translation();
                translation.id = row.translation_id;
                translation.abbreviation = row.trans_abbrev;
                translation.name = row.trans_name;
                translation.publisher = row.publisher;
                translation.info_url = row.info_url;
                translation.screenshot_url = row.screenshot_url;
                var verse = new Verse_1.Verse();
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
        }
        catch (exception) {
            console.log('[map error]', exception);
        }
        return hits;
    };
    __decorate([
        routing_controllers_1.Get('/list/:offset/:limit'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('offset')),
        __param(1, routing_controllers_1.Param('limit')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], SearchController.prototype, "list", null);
    __decorate([
        routing_controllers_1.Get('/chapter/:bookId/:translationId/:chapterNum/:verseId'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('bookId')),
        __param(1, routing_controllers_1.Param('translationId')),
        __param(2, routing_controllers_1.Param('chapterNum')),
        __param(3, routing_controllers_1.Param('verseId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number, Number]),
        __metadata("design:returntype", Promise)
    ], SearchController.prototype, "chapter", null);
    __decorate([
        routing_controllers_1.Get('/verseTranslations/:bookId/:chapterNum/:verseNum'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('bookId')),
        __param(1, routing_controllers_1.Param('chapterNum')),
        __param(2, routing_controllers_1.Param('verseNum')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number]),
        __metadata("design:returntype", Promise)
    ], SearchController.prototype, "verseTranslations", null);
    __decorate([
        routing_controllers_1.Post('/grid'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SearchController.prototype, "grid", null);
    SearchController = __decorate([
        routing_controllers_1.JsonController('/search'),
        __metadata("design:paramtypes", [])
    ], SearchController);
    return SearchController;
}());
exports.SearchController = SearchController;
