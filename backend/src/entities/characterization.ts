import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {Verse} from './verse';

@Entity('characterization')
export class Characterization {
	@PrimaryColumn({type: 'char'})
	id!: string;

	@Column({type: 'varchar', length: 40, nullable: false, unique: true})
	name!: string;

	@OneToMany(() => Verse, (verse: Verse) => verse.book)
	verses!: Verse[];
}
