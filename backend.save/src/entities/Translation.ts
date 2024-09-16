import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';
import {Tome} from './Tome';

@Entity()
export class Translation extends DataRecord {
    @PrimaryColumn()
    id!: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    name!: string;

    @Column({type: 'varchar', length: 25, nullable: false})
    language!: string;

    @Column({type: 'varchar', length: 25, nullable: true})
    abbreviation!: string;

    @Column({type: 'varchar', length: 2048, nullable: true})
    info_url!: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    publisher!: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    copyright!: string;

    @Column({type: 'varchar', length: 1024, nullable: true})
    copyright_info!: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    screenshot_url!: string;

    @Column({type: 'varchar', length: 1024, nullable: true})
    data_source!: string;

    @Column({type: 'tinyint', nullable: false})
    is_default!: number;

    @ManyToOne(() => Tome, (tome: Tome) => tome.translations)
    @JoinColumn({name: 'tome_id'})
    tome!: Tome;
    @Column({type: 'smallint', name: 'tome_id', nullable: false})
    tome_id!: number;

    @OneToMany(() => Verse, (verse: Verse) => verse.translation)
    verses!: Verse[];
}
