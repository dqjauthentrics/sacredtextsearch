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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
        __param(0, routing_controllers_1.Param('offset')), __param(1, routing_controllers_1.Param('limit')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], SearchController.prototype, "list", null);
    __decorate([
        routing_controllers_1.Get('/chapter/:bookId/:translationId/:chapterNum/:verseId'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('bookId')), __param(1, routing_controllers_1.Param('translationId')), __param(2, routing_controllers_1.Param('chapterNum')), __param(3, routing_controllers_1.Param('verseId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number, Number]),
        __metadata("design:returntype", Promise)
    ], SearchController.prototype, "chapter", null);
    __decorate([
        routing_controllers_1.Get('/verseTranslations/:bookId/:chapterNum/:verseNum'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('bookId')), __param(1, routing_controllers_1.Param('chapterNum')), __param(2, routing_controllers_1.Param('verseNum')),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVycy9zZWFyY2guY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXdGO0FBQ3hGLG1DQUFrRDtBQUNsRCwyQ0FBd0M7QUFDeEMscURBQWtEO0FBQ2xELDZEQUF5RDtBQUN6RCx1REFBb0Q7QUFDcEQseUNBQXNDO0FBQ3RDLHlDQUFzQztBQUd0QyxtREFBZ0Q7QUFDaEQsMkZBQXVHO0FBRXZHLCtDQUE0QztBQUU1QyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFHbkM7SUFPSTtRQU5RLFVBQUssR0FBRyxLQUFLLENBQUM7UUFPbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyx1QkFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsdUJBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUlELCtCQUFJLEdBQUosVUFBc0IsTUFBYyxFQUFrQixLQUFhO1FBRm5FLGlCQVlDO1FBVEcsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQWU7WUFDL0MsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVB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QUEsMkJBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQSxFQUFzQixXQUFBLDJCQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7Ozs7bURBNEJ2SjtJQUlEO1FBRkMseUJBQUcsQ0FBQyxrREFBa0QsQ0FBQztRQUN2RCxpQ0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNRLFdBQUEsMkJBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQSxFQUFrQixXQUFBLDJCQUFLLENBQUMsWUFBWSxDQUFDLENBQUEsRUFBc0IsV0FBQSwyQkFBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBOzs7OzZEQUtuSDtJQUlEO1FBRkMsMEJBQUksQ0FBQyxPQUFPLENBQUM7UUFDYixpQ0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNMLFdBQUEsMEJBQUksRUFBRSxDQUFBOzs7O2dEQXdEakI7SUEvSFEsZ0JBQWdCO1FBRDVCLG9DQUFjLENBQUMsU0FBUyxDQUFDOztPQUNiLGdCQUFnQixDQXFUNUI7SUFBRCx1QkFBQztDQXJURCxBQXFUQyxJQUFBO0FBclRZLDRDQUFnQiIsImZpbGUiOiJjb250cm9sbGVycy9zZWFyY2guY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Qm9keSwgR2V0LCBKc29uQ29udHJvbGxlciwgT25VbmRlZmluZWQsIFBhcmFtLCBQb3N0fSBmcm9tICdyb3V0aW5nLWNvbnRyb2xsZXJzJztcbmltcG9ydCB7Z2V0Q29ubmVjdGlvbiwgUmVwb3NpdG9yeX0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge1ZlcnNlfSBmcm9tICcuLi9lbnRpdGllcy9WZXJzZSc7XG5pbXBvcnQge0RhdGFSZXN1bHR9IGZyb20gJy4uL2VudGl0aWVzL0RhdGFSZXN1bHQnO1xuaW1wb3J0IHtUZXh0QW5hbHlzaXN9IGZyb20gJy4uL2NvbXBvbmVudHMvdGV4dC1hbmFseXNpcyc7XG5pbXBvcnQge1RyYW5zbGF0aW9ufSBmcm9tICcuLi9lbnRpdGllcy9UcmFuc2xhdGlvbic7XG5pbXBvcnQge0Jvb2t9IGZyb20gJy4uL2VudGl0aWVzL0Jvb2snO1xuaW1wb3J0IHtUb21lfSBmcm9tICcuLi9lbnRpdGllcy9Ub21lJztcbmltcG9ydCB7UXVlcnlJbnRlcmZhY2V9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlcnkuaW50ZXJmYWNlJztcbmltcG9ydCB7U2VhcmNoUmVzdWx0SW50ZXJmYWNlfSBmcm9tICcuLi9pbnRlcmZhY2VzL3NlYXJjaC1yZXN1bHQuaW50ZXJmYWNlJztcbmltcG9ydCB7VXNlclF1ZXJ5fSBmcm9tICcuLi9lbnRpdGllcy9Vc2VyUXVlcnknO1xuaW1wb3J0IHtCb29rQ2hhcHRlclZlcnNlLCBCb29rQ2hhcHRlclZlcnNlSW50ZXJmYWNlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Jvb2stY2hhcHRlci12ZXJzZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkUG9zdEludGVyZmFjZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ncmlkLXBvc3QuaW50ZXJmYWNlJztcbmltcG9ydCB7Q2hhcHRlcn0gZnJvbSAnLi4vZW50aXRpZXMvQ2hhcHRlcic7XG5cbmNvbnN0IEh0dHBTdGF0dXMgPSByZXF1aXJlKCdodHRwLXN0YXR1cy1jb2RlcycpO1xuY29uc3QgbmF0dXJhbCA9IHJlcXVpcmUoJ25hdHVyYWwnKTtcblxuQEpzb25Db250cm9sbGVyKCcvc2VhcmNoJylcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb250cm9sbGVyIHtcbiAgICBwcml2YXRlIGRlYnVnID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBib29rUmVwbzogUmVwb3NpdG9yeTxCb29rPjtcbiAgICBwcml2YXRlIGNoYXB0ZXJSZXBvOiBSZXBvc2l0b3J5PENoYXB0ZXI+O1xuICAgIHByaXZhdGUgdmVyc2VSZXBvOiBSZXBvc2l0b3J5PFZlcnNlPjtcbiAgICBwcml2YXRlIHVzZXJRdWVyeVJlcG86IFJlcG9zaXRvcnk8VXNlclF1ZXJ5PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvb2tSZXBvID0gZ2V0Q29ubmVjdGlvbigpLmdldFJlcG9zaXRvcnkoQm9vayk7XG4gICAgICAgIHRoaXMuY2hhcHRlclJlcG8gPSBnZXRDb25uZWN0aW9uKCkuZ2V0UmVwb3NpdG9yeShDaGFwdGVyKTtcbiAgICAgICAgdGhpcy52ZXJzZVJlcG8gPSBnZXRDb25uZWN0aW9uKCkuZ2V0UmVwb3NpdG9yeShWZXJzZSk7XG4gICAgICAgIHRoaXMudXNlclF1ZXJ5UmVwbyA9IGdldENvbm5lY3Rpb24oKS5nZXRSZXBvc2l0b3J5KFVzZXJRdWVyeSk7XG4gICAgfVxuXG4gICAgQEdldCgnL2xpc3QvOm9mZnNldC86bGltaXQnKVxuICAgIEBPblVuZGVmaW5lZCg0MDQpXG4gICAgbGlzdChAUGFyYW0oJ29mZnNldCcpIG9mZnNldDogbnVtYmVyLCBAUGFyYW0oJ2xpbWl0JykgbGltaXQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy52ZXJzZVJlcG8uY291bnQoKS50aGVuKCh0b3RhbENvdW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNlUmVwby5maW5kKHtza2lwOiBvZmZzZXQsIHRha2U6IGxpbWl0LCByZWxhdGlvbnM6IFsnYm9vayddfSlcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZlcnNlczogQXJyYXk8VmVyc2U+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFSZXN1bHQ8VmVyc2U+KHRvdGFsQ291bnQsIG9mZnNldCwgbGltaXQsIHZlcnNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoYCR7ZX1cXG5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBHZXQoJy9jaGFwdGVyLzpib29rSWQvOnRyYW5zbGF0aW9uSWQvOmNoYXB0ZXJOdW0vOnZlcnNlSWQnKVxuICAgIEBPblVuZGVmaW5lZCg0MDQpXG4gICAgYXN5bmMgY2hhcHRlcihAUGFyYW0oJ2Jvb2tJZCcpIGJvb2tJZDogbnVtYmVyLCBAUGFyYW0oJ3RyYW5zbGF0aW9uSWQnKSB0cmFuc2xhdGlvbklkOiBudW1iZXIsIEBQYXJhbSgnY2hhcHRlck51bScpIGNoYXB0ZXJOdW06IG51bWJlciwgQFBhcmFtKCd2ZXJzZUlkJykgdmVyc2VJZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjaGFwdGVyOiBDaGFwdGVyID0gbmV3IENoYXB0ZXIoKTtcbiAgICAgICAgY2hhcHRlci5pZCA9IDA7XG4gICAgICAgIGNoYXB0ZXIuYm9va19pZCA9IGJvb2tJZDtcbiAgICAgICAgY2hhcHRlci5jaGFwdGVyX251bWJlciA9IGNoYXB0ZXJOdW07XG4gICAgICAgIGNoYXB0ZXIudHJhbnNsYXRpb25faWQgPSB0cmFuc2xhdGlvbklkO1xuICAgICAgICBjaGFwdGVyLm5hbWUgPSAnJztcbiAgICAgICAgY2hhcHRlci50aXRsZSA9ICcnO1xuICAgICAgICBhd2FpdCB0aGlzLmNoYXB0ZXJSZXBvLmZpbmRPbmUoe3doZXJlOiB7Ym9va19pZDogYm9va0lkLCB0cmFuc2xhdGlvbl9pZDogdHJhbnNsYXRpb25JZCwgY2hhcHRlcl9udW1iZXI6IGNoYXB0ZXJOdW19fSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHRDaGFwdGVyOiBDaGFwdGVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdENoYXB0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdENoYXB0ZXInLCByZXN1bHRDaGFwdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcHRlciA9IHJlc3VsdENoYXB0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaGFwdGVyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnZlcnNlUmVwb1xuICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHt3aGVyZToge2Jvb2tfaWQ6IGJvb2tJZCwgdHJhbnNsYXRpb25faWQ6IHRyYW5zbGF0aW9uSWQsIGNoYXB0ZXJfbnVtYmVyOiBjaGFwdGVyTnVtfSwgb3JkZXI6IHt2ZXJzZV9udW1iZXI6ICdBU0MnfX0pXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZlcnNlczogQXJyYXk8VmVyc2U+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFwdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFwdGVyLnZlcnNlcyA9IHZlcnNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGAke2V9XFxuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRhUmVzdWx0PENoYXB0ZXI+KGNoYXB0ZXIgPyAxIDogMCwgMCwgMSwgY2hhcHRlcik7XG4gICAgfVxuXG4gICAgQEdldCgnL3ZlcnNlVHJhbnNsYXRpb25zLzpib29rSWQvOmNoYXB0ZXJOdW0vOnZlcnNlTnVtJylcbiAgICBAT25VbmRlZmluZWQoNDA0KVxuICAgIGFzeW5jIHZlcnNlVHJhbnNsYXRpb25zKEBQYXJhbSgnYm9va0lkJykgYm9va0lkOiBudW1iZXIsIEBQYXJhbSgnY2hhcHRlck51bScpIGNoYXB0ZXJOdW06IG51bWJlciwgQFBhcmFtKCd2ZXJzZU51bScpIHZlcnNlTnVtOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc3FsID0gYENBTEwgc2VhcmNoVHJhbnNsYXRpb25zKCR7Ym9va0lkfSwgJHtjaGFwdGVyTnVtfSwgJHt2ZXJzZU51bX0pYDtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VSZXBvLnF1ZXJ5KHNxbCkudGhlbigocm93czogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBIaXRzKHJvd3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAUG9zdCgnL2dyaWQnKVxuICAgIEBPblVuZGVmaW5lZCg0MDQpXG4gICAgYXN5bmMgZ3JpZChAQm9keSgpIHBvc3Q6IEdyaWRQb3N0SW50ZXJmYWNlKSB7XG4gICAgICAgIC8vIHRoaXMuZGVidWcgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHBvc3QucXVlcnk7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGF3YWl0IHRoaXMuY2xlYW4ocG9zdC5xdWVyeSk7XG4gICAgICAgICAgICBjb25zdCBpc1NwZWNpZmljID0gcXVlcnkgJiYgKHF1ZXJ5Lm1hdGNoKC86L2cpIHx8IFtdKS5sZW5ndGggPT09IDI7XG4gICAgICAgICAgICBjb25zdCB2ZXJzZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBvcmRlcjogc3RyaW5nID0gcG9zdC5zb3J0IHx8ICdyYW5rIERFU0MnO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25JZFN0ciA9IHBvc3QuaGFyZENvbnN0cmFpbnRzICYmIHBvc3QuaGFyZENvbnN0cmFpbnRzLmxlbmd0aCA+IDAgPyBwb3N0LmhhcmRDb25zdHJhaW50c1swXS52YWx1ZS5qb2luKCcsJykgOiAnJztcblxuICAgICAgICAgICAgbGV0IGJvb2tOYW1lID0gJyc7XG4gICAgICAgICAgICBsZXQgY2hOdW0gPSAwO1xuICAgICAgICAgICAgbGV0IHZzTnVtID0gMDtcbiAgICAgICAgICAgIGlmIChpc1NwZWNpZmljKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSBxdWVyeS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgICAgIGJvb2tOYW1lID0gcGFydHNbMF07XG4gICAgICAgICAgICAgICAgY2hOdW0gPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICAgICAgdnNOdW0gPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvdW50UXVlcnkgPSBpc1NwZWNpZmljID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgQ0FMTCBzZWFyY2hTcGVjaWZpY1ZlcnNlQ291bnQoJyR7Ym9va05hbWV9JywgJyR7Y2hOdW19JywnJHt2c051bX0nLCAnJHt0cmFuc2xhdGlvbklkU3RyfScpYCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFNFTEVDVCBzZWFyY2hWZXJzZUNvdW50KCcke3F1ZXJ5fScsICcke3RyYW5zbGF0aW9uSWRTdHJ9JykgQVMgY250YDtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gaXNTcGVjaWZpYyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBDQUxMIHNlYXJjaFNwZWNpZmljVmVyc2VzKCcke2Jvb2tOYW1lfScsICcke2NoTnVtfScsJyR7dnNOdW19JywgJyR7dHJhbnNsYXRpb25JZFN0cn0nLCAke3Bvc3Qub2Zmc2V0fSwgJHtwb3N0LnNpemV9LCAnJHtvcmRlcn0nKWAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgQ0FMTCBzZWFyY2hWZXJzZXMoJyR7cXVlcnl9JywgJyR7dHJhbnNsYXRpb25JZFN0cn0nLCAke3Bvc3Qub2Zmc2V0fSwgJHtwb3N0LnNpemV9LCAnJHtvcmRlcn0nKWA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgIFBPU1RFRCBRVUVSWTogJyArIHBvc3QucXVlcnkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICAgICAgT1JERVJJTkc6ICcgKyBvcmRlcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgQ0xFQU5FRCBRVUVSWTogJyArIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVFJBTlNMQVRJT04gSURTOiAnICsgdHJhbnNsYXRpb25JZFN0cik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAgICBTUUwgQ0FMTDogJyArIHNlYXJjaFF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNlUmVwby5xdWVyeShjb3VudFF1ZXJ5KS50aGVuKChjb3VudFJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IGlzU3BlY2lmaWMgPyBjb3VudFJlc3VsdFswXVswXS5jbnQgOiBjb3VudFJlc3VsdFswXS5jbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2VSZXBvLnF1ZXJ5KHNlYXJjaFF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJvd3M6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdHM6IEFycmF5PFNlYXJjaFJlc3VsdEludGVyZmFjZT4gPSB0aGlzLm1hcEhpdHMocm93cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsUXVlcnkgJiYgb3JpZ2luYWxRdWVyeS50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlUXVlcnkocXVlcnksIGhpdHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgTlVNIEhJVFM6ICcgKyBoaXRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFSZXN1bHQ8U2VhcmNoUmVzdWx0SW50ZXJmYWNlPih0b3RhbENvdW50LCBwb3N0Lm9mZnNldCwgcG9zdC5zaXplLCBoaXRzLCBxdWVyeSwgdmVyc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoYFtxdWVyeV0gJHtleGNlcHRpb259XFxuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbc2VhcmNoIGZhaWxdJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YVJlc3VsdDxTZWFyY2hSZXN1bHRJbnRlcmZhY2U+KDAsIDAsIDAsIFtdLCBudWxsLCBudWxsLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJhbmRvbVF1ZXJ5KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCBxdWVyeSA9ICcnO1xuICAgICAgICBhd2FpdCB0aGlzLnZlcnNlUmVwby5xdWVyeSgnc2VsZWN0IHJhbmRvbVF1ZXJ5KCkgYXMgcScpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdFswXSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcmVzdWx0WzBdLnE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXF1ZXJ5IHx8IHF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gJ2pvbmFoIHdoYWxlJzsgLy8gZmFpbHNhZmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICBhc3luYyBjbGVhbihxdWVyeTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgnL1xcLy9nJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICghcXVlcnkgfHwgcXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vICAgICBhd2FpdCB0aGlzLnJhbmRvbVF1ZXJ5KCkudGhlbigocTogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgcXVlcnkgPSBxO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gcXVlcnkgfHwgJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRCb29rKGJjdjogQm9va0NoYXB0ZXJWZXJzZUludGVyZmFjZSk6IFByb21pc2U8Qm9vayB8IG51bGw+IHtcbiAgICAgICAgbGV0IGJvb2s6IEJvb2sgfCBudWxsID0gbnVsbDtcbiAgICAgICAgYXdhaXQgdGhpcy5ib29rUmVwby5maW5kT25lKHt3aGVyZToge25hbWU6IGJjdi5ib29rfSwgcmVsYXRpb25zOiBbJ3RvbWUnXX0pXG4gICAgICAgICAgICAgICAgICAudGhlbigoYm9va1JlYzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgYm9vayA9IGJvb2tSZWM7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbZ2V0VmVyc2U6Ym9va10gJHtyZWFzb24udG9TdHJpbmcoKX1gKVxuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gYm9vaztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldFZlcnNlKGJvb2tJZDogbnVtYmVyLCBiY3Y6IEJvb2tDaGFwdGVyVmVyc2VJbnRlcmZhY2UpOiBQcm9taXNlPFZlcnNlIHwgbnVsbD4ge1xuICAgICAgICBsZXQgdmVyc2U6IFZlcnNlIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGF3YWl0IHRoaXMudmVyc2VSZXBvLmZpbmRPbmUoe3doZXJlOiB7Y2hhcHRlcl9udW1iZXI6IGJjdi5jaGFwdGVyLCB2ZXJzZV9udW1iZXI6IGJjdi52ZXJzZSwgYm9va19pZDogYm9va0lkfX0pXG4gICAgICAgICAgICAgICAgICAudGhlbigodmVyc2VSZWM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHZlcnNlID0gdmVyc2VSZWM7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbZ2V0VmVyc2U6dmVyc2VdICR7cmVhc29uLnRvU3RyaW5nKCl9YClcbiAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHZlcnNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcXVlcmlmeSh0YTogVGV4dEFuYWx5c2lzLCBxdWVyeTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRva2VuaXplciA9IG5ldyBuYXR1cmFsLldvcmRUb2tlbml6ZXIoKTtcbiAgICAgICAgbGV0IHdvcmRzID0gdG9rZW5pemVyLnRva2VuaXplKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAod29yZHMpIHtcbiAgICAgICAgICAgIHdvcmRzID0gdGEuc3RyaXAod29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b3JkcyA/IHdvcmRzLmpvaW4oJyAnKSA6ICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcGFyc2VRdWVyeShxdWVyeTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRhID0gbmV3IFRleHRBbmFseXNpcygpO1xuICAgICAgICBjb25zdCBiY3YgPSBuZXcgQm9va0NoYXB0ZXJWZXJzZSgpO1xuICAgICAgICBsZXQgdmVyc2U6IFZlcnNlIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgICAgICBjb25zdCBib29rQ2hhcHRlclZlcnNlID0gYmN2LnBhcnNlKHF1ZXJ5KTtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICAgQy9TL1Y6JywgYm9va0NoYXB0ZXJWZXJzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvb2tDaGFwdGVyVmVyc2UpIHtcbiAgICAgICAgICAgIGxldCBib29rID0gYXdhaXQgdGhpcy5nZXRCb29rKGJvb2tDaGFwdGVyVmVyc2UpLnRoZW4oKTtcbiAgICAgICAgICAgIGlmIChib29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAgICAgIEJPT0s6ICcsIGJvb2submFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcnNlID0gYXdhaXQgdGhpcy5nZXRWZXJzZShib29rLmlkLCBib29rQ2hhcHRlclZlcnNlKS50aGVuKCk7XG4gICAgICAgICAgICAgICAgaWYgKHZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnICAgICAgICBWRVJTRTogJywgdmVyc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVyc2UuYm9vayA9IGJvb2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5xdWVyaWZ5KHRhLCB2ZXJzZSA/IHZlcnNlLmJvZHkgOiBxdWVyeSk7XG4gICAgICAgIHJldHVybiB7cXVlcnk6IHF1ZXJ5LCB2ZXJzZTogdmVyc2V9O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3JkZXJpbmcoZGF0YTogUXVlcnlJbnRlcmZhY2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3JkZXJpbmcgPSAnJztcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5vcmRlcikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbCA9IGRhdGEub3JkZXJbaV0uY29sdW1uO1xuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBkYXRhLm9yZGVyW2ldLmRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbE5hbWUgPSBjb2wucmVwbGFjZSgndmVyc2UuJywgJycpLnJlcGxhY2UoJy4nLCAnXycpOyAvLyBlLmcuLCAnYm9vay5uYW1lJyA9PiAnYm9va19uYW1lJ1xuICAgICAgICAgICAgICAgICAgICBkaXIgPSBkaXIgJiYgZGlyLmxlbmd0aCA+IDAgPyAnICcgKyBkaXIudG9VcHBlckNhc2UoKSA6ICcgQVNDJztcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJpbmcgKz0gY29sTmFtZSArIGRpcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yZGVyaW5nLmxlbmd0aCA+IDAgPyBvcmRlcmluZyA6ICdyYW5rIERFU0MnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcmVRdWVyeShzZWFyY2hRdWVyeTogc3RyaW5nLCBuX2hpdHM6IG51bWJlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy51c2VyUXVlcnlSZXBvLmZpbmRPbmUoe3doZXJlOiB7J3Rlcm1zJzogc2VhcmNoUXVlcnl9fSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVjOiBVc2VyUXVlcnkgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYyA9IG5ldyBVc2VyUXVlcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYy50ZXJtcyA9IHNlYXJjaFF1ZXJ5LnN1YnN0cigwLCAyMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVjLnVzYWdlX2NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjLnVzYWdlX2NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYy51c2FnZV9jb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjLm5faGl0cyA9IG5faGl0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBbc3RvcmVRdWVyeV06ICR7ZXhjZXB0aW9ufWApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbc3RvcmUgZXJyb3JdJywgZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWFwSGl0cyhyb3dzOiBBcnJheTxhbnk+KTogQXJyYXk8U2VhcmNoUmVzdWx0SW50ZXJmYWNlPiB7XG4gICAgICAgIGxldCBoaXRzOiBBcnJheTxTZWFyY2hSZXN1bHRJbnRlcmZhY2U+ID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3NbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSByb3dzWzBdW2ldO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9tZSA9IG5ldyBUb21lKCk7XG4gICAgICAgICAgICAgICAgdG9tZS5pZCA9IHJvdy50b21lX2lkO1xuICAgICAgICAgICAgICAgIHRvbWUucmVsaWdpb25faWQgPSByb3cucmVsaWdpb25faWQ7XG4gICAgICAgICAgICAgICAgdG9tZS5uYW1lID0gcm93LnRvbWVfbmFtZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2sgPSBuZXcgQm9vaygpO1xuICAgICAgICAgICAgICAgIGJvb2suaWQgPSByb3cuYm9va19pZDtcbiAgICAgICAgICAgICAgICBib29rLm5hbWUgPSByb3cuYm9va19uYW1lO1xuICAgICAgICAgICAgICAgIGJvb2sudG9tZV9pZCA9IHJvdy50b21lX2lkO1xuICAgICAgICAgICAgICAgIGJvb2sudG9tZSA9IHRvbWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IG5ldyBUcmFuc2xhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uLmlkID0gcm93LnRyYW5zbGF0aW9uX2lkO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uLmFiYnJldmlhdGlvbiA9IHJvdy50cmFuc19hYmJyZXY7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb24ubmFtZSA9IHJvdy50cmFuc19uYW1lO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uLnB1Ymxpc2hlciA9IHJvdy5wdWJsaXNoZXI7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb24uaW5mb191cmwgPSByb3cuaW5mb191cmw7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb24uc2NyZWVuc2hvdF91cmwgPSByb3cuc2NyZWVuc2hvdF91cmw7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJzZSA9IG5ldyBWZXJzZSgpO1xuICAgICAgICAgICAgICAgIHZlcnNlLmlkID0gcm93LmlkO1xuICAgICAgICAgICAgICAgIHZlcnNlLmJvZHkgPSByb3cuYm9keTtcbiAgICAgICAgICAgICAgICB2ZXJzZS5ib29rID0gYm9vaztcbiAgICAgICAgICAgICAgICB2ZXJzZS5jaGFwdGVyX251bWJlciA9IHJvdy5jaGFwdGVyX251bWJlcjtcbiAgICAgICAgICAgICAgICB2ZXJzZS52ZXJzZV9udW1iZXIgPSByb3cudmVyc2VfbnVtYmVyO1xuICAgICAgICAgICAgICAgIHZlcnNlLnRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb247XG5cbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB2ZXJzZTogdmVyc2UsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiByb3cuc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgIHJhbms6IE1hdGgucm91bmQocm93LnJhbmspLFxuICAgICAgICAgICAgICAgICAgICB2aW9sZW5jZTogTWF0aC5yb3VuZChyb3cudmlvbGVuY2UpLFxuICAgICAgICAgICAgICAgICAgICBteXRoOiBNYXRoLnJvdW5kKHJvdy5teXRoKSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbjogTWF0aC5yb3VuZChyb3cuc3VibWlzc2lvbiksXG4gICAgICAgICAgICAgICAgICAgIGNoYXB0ZXJUaXRsZTogcm93LmNoYXB0ZXJUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhcHRlck5hbWU6IHJvdy5jaGFwdGVyTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbbWFwIGVycm9yXScsIGV4Y2VwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhpdHM7XG4gICAgfVxufVxuIl19
