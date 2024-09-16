import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Translation} from './Translation';
import {Book} from './Book';
import {Religion} from './Religion';

@Entity()
export class Tome extends DataRecord {
    @PrimaryColumn({type: 'smallint'})
    id!: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name!: string;

    @Column({type: 'tinyint', nullable: true})
    has_translations!: number;

    @Column({type: 'tinyint'})
    sort_order!: string;

    @Column({type: 'varchar', length: 10, nullable: true})
    abbreviation!: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    icon!: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    color!: string;

    @OneToMany(() => Translation, (translation: Translation) => translation.tome)
    translations!: Translation[];

    @OneToMany(() => Book, (book: Book) => book.tome)
    books!: Book[];

    @ManyToOne(() => Religion, religion => religion.tomes)
    @JoinColumn({name: 'religion_id'})
    religion!: Religion;
    @Column({type: 'smallint', nullable: false})
    religion_id!: number;
}
