import { TomeInterface } from './tome.interface';
import { VerseInterface } from './verse.interface';
export declare class TranslationInterface {
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
    tome: TomeInterface;
    verses: VerseInterface[];
}
