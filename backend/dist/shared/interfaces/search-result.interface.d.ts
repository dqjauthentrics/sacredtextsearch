import { VerseInterface } from '../entity-interfaces/verse.interface';
export interface SearchResultInterface {
    verse: VerseInterface;
    zrank: number;
    zrankNormalized: number;
    combinedRank: number;
    score: number;
    violence: number;
    myth: number;
    submission: number;
    chapterName: string | null;
    chapterTitle: string | null;
}
