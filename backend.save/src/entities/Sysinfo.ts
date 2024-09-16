import {Column, Entity} from 'typeorm';
import {DataRecord} from './DataRecord';

@Entity()
export class Sysinfo extends DataRecord {
    @Column({type: 'timestamp', nullable: false})
    last_collection_update!: number;
}
