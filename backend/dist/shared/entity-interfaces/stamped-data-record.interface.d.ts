import { Timestamp } from 'rxjs';
export declare abstract class StampedDataRecordInterface {
    created: Timestamp<string>;
    modified: Timestamp<string>;
}
