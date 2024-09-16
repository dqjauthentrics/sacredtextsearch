"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookChapterVerse = void 0;
class BookChapterVerse {
    parse(query) {
        if (query.indexOf(':') >= 0) {
            const parts = query.split(':');
            if (parts && parts.length === 3) {
                const book = parts[0];
                const chapter = Number(parts[1]);
                const verse = Number(parts[2]);
                return { book: book, chapter: chapter, verse: verse };
            }
        }
        return null;
    }
}
exports.BookChapterVerse = BookChapterVerse;
//# sourceMappingURL=book-chapter-verse.interface.js.map