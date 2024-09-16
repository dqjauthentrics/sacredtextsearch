import { Sysinfo } from '../entities/sysinfo';
import { DataResult } from '../shared/interfaces/data-result';
export declare class SysinfoController {
    private repo;
    private readonly dataSource;
    constructor();
    get(): Promise<void | DataResult<Sysinfo>>;
}
