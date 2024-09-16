export interface BookChapterVerseInterface {
    book: string;
    chapter: number;
    verse: number;
}

export class BookChapterVerse {
    public parse(query: string): BookChapterVerseInterface | null {
        if (query.indexOf(':') >= 0) {
            const parts = query.split(':');
            if (parts && parts.length === 3) {
                const book = parts[0];
                const chapter: number = Number(parts[1]);
                const verse: number = Number(parts[2]);
                return {book: book, chapter: chapter, verse: verse};
            }
        }
        return null;
    }
}
