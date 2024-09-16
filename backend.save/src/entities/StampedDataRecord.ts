import {DataRecord} from './DataRecord';
import {CreateDateColumn, Timestamp, UpdateDateColumn} from 'typeorm';

export abstract class StampedDataRecord extends DataRecord {
    @CreateDateColumn({name: 'created', type: 'timestamp', nullable: false})
    created!: Timestamp;

    @UpdateDateColumn({name: 'modified', type: 'timestamp', nullable: false})
    modified!: Timestamp;
}
