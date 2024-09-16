import { VerseInterface } from '../shared/entity-interfaces/verse.interface';
export declare class DataPage {
    numItems: number;
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    cleanQuery: string | null;
    verse: VerseInterface | null;
    constructor(numItems: number, totalItems: number, totalPages: number, pageNumber: number, cleanQuery?: string | null, verse?: VerseInterface | null);
}
