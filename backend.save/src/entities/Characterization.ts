import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';

@Entity()
export class Characterization extends DataRecord {
    @PrimaryColumn({type: 'char'})
    id!: string;

    @Column({type: 'varchar', length: 40, nullable: false, unique: true})
    name!: string;

    @OneToMany(() => Verse, (verse: Verse) => verse.book)
    verses!: Verse[];
}
