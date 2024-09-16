import {Column, Entity, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';

@Entity()
export class UserQuery extends DataRecord {
    @PrimaryColumn({type: 'bigint'})
    id!: number;

    @Column({type: 'varchar', length: 200, nullable: false})
    terms!: string;

    @Column({type: 'int', nullable: false})
    usage_count!: number;

    @Column({type: 'tinyint', nullable: false})
    n_hits!: number;
}
