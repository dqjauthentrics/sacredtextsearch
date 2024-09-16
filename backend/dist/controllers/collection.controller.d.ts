import { Tome } from '../entities/tome';
import { Religion } from '../entities/religion';
import { DataResult } from '../shared/interfaces/data-result';
export declare class CollectionController {
    private readonly dataSource;
    constructor();
    list(): Promise<void | DataResult<Tome>>;
    tree(): Promise<DataResult<Religion>>;
    private getReligions;
}
