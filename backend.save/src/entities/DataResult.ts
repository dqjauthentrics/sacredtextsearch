import {Verse} from './Verse';

const HttpStatus = require('http-status-codes');

export const DATA_RESULT_ERROR = 'E';
export const DATA_RESULT_SINGLE = 'S';
export const DATA_RESULT_LIST = 'L';

export class DataPage {
    public numItems = 0;
    public totalItems = 0;
    public totalPages = 0;
    public pageNumber = 0;
    public cleanQuery: string | null = '';
    public verse: Verse | null = null;

    constructor(numItems: number, totalItems: number, totalPages: number, pageNumber: number, cleanQuery: string | null = null, verse: Verse | null = null) {
        this.numItems = numItems;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
        this.cleanQuery = cleanQuery;
        this.verse = verse;
    }
}

export class DataResult<T> {
    public code = HttpStatus.OK;
    public type: string = DATA_RESULT_SINGLE;
    public data: Iterable<T> | T = [];
    public page: DataPage = new DataPage(0, 0, 0, 0);

    constructor(totalCount: number,
                offset: number,
                limit: number,
                data: Array<T> | T,
                cleanQuery: string | null = null,
                verse: Verse | null = null,
                code: number = HttpStatus.OK
    ) {
        if (Array.isArray(data)) {
            this.type = DATA_RESULT_LIST;
            this.data = new Array<T>();
            let totPages = 0;
            let pageNum = 0;
            if (totalCount > 0 && limit > 0) {
                totPages = Math.round(totalCount / limit);
                pageNum = Math.round((offset * limit) / limit);
            }
            this.page = new DataPage(data.length, totalCount, totPages, pageNum, cleanQuery, verse);
        } else {
            this.type = DATA_RESULT_SINGLE;
        }
        this.data = data;
        this.code = code;
    }
}

