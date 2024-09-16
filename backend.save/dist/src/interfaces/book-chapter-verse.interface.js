"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookChapterVerse = void 0;
var BookChapterVerse = /** @class */ (function () {
    function BookChapterVerse() {
    }
    BookChapterVerse.prototype.parse = function (query) {
        if (query.indexOf(':') >= 0) {
            var parts = query.split(':');
            if (parts && parts.length === 3) {
                var book = parts[0];
                var chapter = Number(parts[1]);
                var verse = Number(parts[2]);
                return { book: book, chapter: chapter, verse: verse };
            }
        }
        return null;
    };
    return BookChapterVerse;
}());
exports.BookChapterVerse = BookChapterVerse;
