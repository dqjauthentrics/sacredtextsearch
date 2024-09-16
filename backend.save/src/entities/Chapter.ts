import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';
import {Tome} from './Tome';

@Entity()
export class Chapter extends DataRecord {
    @PrimaryColumn()
    id!: number;

    @Column({type: 'tinyint', nullable: true})
    book_id!: number;

    @Column({type: 'int', nullable: true})
    translation_id!: number;

    @Column({type: 'tinyint', nullable: true})
    chapter_number!: number;

    @Column({type: 'varchar', length: 500, nullable: false})
    name!: string;

    @Column({type: 'varchar', length: 1000})
    title!: string;

    // Not related by key.
    verses?: Array<Verse>;
}
