export type GridConstraintOperators = '=' | '<>' | '>' | '<' | '>=' | '<=';
export interface GridPostFacet {
    name: string;
    values: Array<string | number>;
}
export interface GridColFilter {
    name: string;
    query: string;
}
export interface GridConstraint {
    colName: string;
    operator: GridConstraintOperators;
    value: any;
}
export interface GridPostInterface {
    offset: number;
    size: number;
    sort: string | null;
    query: string | null;
    filters: Array<GridColFilter>;
    facets: Array<GridPostFacet>;
    excludeIds?: Array<number | string>;
    hardConstraints?: Array<GridConstraint>;
}
