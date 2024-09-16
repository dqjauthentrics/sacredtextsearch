export interface BookChapterVerseInterface {
    book: string;
    chapter: number;
    verse: number;
}
export declare class BookChapterVerse {
    parse(query: string): BookChapterVerseInterface | null;
}
