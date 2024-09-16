import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {DataRecord} from './DataRecord';
import {Verse} from './Verse';

@Entity()
export class VerseCharacterization extends DataRecord {
    @PrimaryColumn({type: 'int'})
    id!: number;

    @Column({type: 'char', length: 1, nullable: false})
    characterization_id!: string;

    @Column({name: 'verse_id', nullable: false})
    verse_id!: number;

    @Column({type: 'int', nullable: false})
    score!: number;

    @Column({type: 'float', nullable: false})
    percent!: number;

    @ManyToOne(() => Verse, (verse: Verse) => verse.characterizations)
    @JoinColumn({name: 'verse_id'})
    verse!: VerseCharacterization;
}
