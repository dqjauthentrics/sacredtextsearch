import { DataPage } from '../../components/data-page';
import { VerseInterface } from '../entity-interfaces/verse.interface';
export declare const DATA_RESULT_ERROR = "E";
export declare const DATA_RESULT_SINGLE = "S";
export declare const DATA_RESULT_LIST = "L";
export declare class DataResult<T> {
    code: number;
    type: string;
    data: Iterable<T> | T;
    page: DataPage;
    constructor(totalCount: number, offset: number, limit: number, data: Array<T> | T, cleanQuery?: string | null, verse?: VerseInterface | null, code?: number);
}
