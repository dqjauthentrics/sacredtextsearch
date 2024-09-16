import { VerseInterface } from './verse.interface';
export declare class ChapterInterface {
    id: number;
    bookId: number;
    translationId: number;
    chapterNumber: number;
    name: string;
    verses?: Array<VerseInterface>;
}
