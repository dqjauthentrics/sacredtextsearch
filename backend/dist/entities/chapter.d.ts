import { Verse } from './verse';
export declare class Chapter {
    id: number;
    bookId: number;
    translationId: number;
    chapterNumber: number;
    name: string;
    verses?: Array<Verse>;
}
