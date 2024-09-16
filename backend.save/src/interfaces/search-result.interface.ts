import {Verse} from '../entities/Verse';

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
