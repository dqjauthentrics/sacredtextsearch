import { Verse } from './verse';
import { Tome } from './tome';
export declare class Translation {
    id: number;
    name: string;
    language: string;
    abbreviation: string;
    infoUrl: string;
    publisher: string;
    copyright: string;
    copyrightInfo: string;
    screenshotUrl: string;
    dataSource: string;
    isDefault: number;
    tomeId: number;
    tome: Tome;
    verses: Verse[];
}
