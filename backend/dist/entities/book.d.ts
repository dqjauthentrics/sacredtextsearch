import { Verse } from './verse';
import { Tome } from './tome';
export declare class Book {
    id: number;
    name: string;
    genreId: number;
    subTitle: string;
    sourceId: number;
    tomeId: number;
    verses: Verse[];
    tome: Tome;
}
