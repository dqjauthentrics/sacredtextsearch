import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';
import {Tome} from './Tome';

@Entity()
export class Book extends DataRecord {
    @PrimaryColumn()
    id!: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    name!: string;

    @Column({type: 'tinyint', nullable: true})
    genre_id!: number;

    @Column({type: 'varchar', length: 100})
    sub_title!: string;

    @Column({type: 'int', nullable: true})
    source_id!: number;

    @OneToMany(() => Verse, (verse: Verse) => verse.book)
    verses!: Verse[];

    @ManyToOne(() => Tome, (tome: Tome) => tome.books)
    @JoinColumn({name: 'tome_id'})
    tome!: Tome;
    @Column({type: 'smallint', nullable: false})
    tome_id!: number;
}
