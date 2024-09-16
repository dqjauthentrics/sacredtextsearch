import {Verse} from '../entities/verse';

export interface SearchResultInterface {
    verse: Verse;
    rank: number;
    score: number;
    violence: number;
    myth: number;
    submission: number;
    chapterName: string | null;
    chapterTitle: string | null;
}
