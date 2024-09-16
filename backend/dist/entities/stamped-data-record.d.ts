import { Timestamp } from 'typeorm';
export declare abstract class StampedDataRecord {
    created: Timestamp;
    modified: Timestamp;
}
