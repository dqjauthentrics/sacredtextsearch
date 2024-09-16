import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';
import {Tome} from './Tome';

@Entity()
export class Religion extends DataRecord {
    @PrimaryColumn()
    id!: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name!: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    adherents!: string;

    @Column({type: 'varchar', length: 4096})
    description!: string;

    @Column({type: 'smallint', nullable: true})
    parent_id!: number;

    @Column({type: 'tinyint', nullable: true})
    sort_order!: number;

    @OneToMany(() => Tome, (tome: Tome) => tome.religion)
    tomes!: Tome[];

    @ManyToOne(() => Religion, religion => religion.children)
    @JoinColumn({name: 'parent_id'})
    parent!: Religion;

    @OneToMany(() => Religion, religion => religion.parent)
    @JoinColumn({name: 'parent_id'})
    children!: Religion[];
}
