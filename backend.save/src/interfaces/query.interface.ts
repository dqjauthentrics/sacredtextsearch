import {FilterSelectionInterface} from './filter-selection.interface';

export interface QueryOrderInterface {
    column: string;
    direction: string;
}

export interface QueryInterface {
    offset: number;
    limit: number;
    query: string;
    order: Array<QueryOrderInterface> | null;
    verseId: number | null;
    translationIds: Array<number>
}
