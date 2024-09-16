import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Verse } from './verse';

@Entity('verse-characterization')
export class VerseCharacterization {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column({
    name: 'characterization_id',
    type: 'char',
    length: 1,
    nullable: false,
  })
  characterizationId!: string;

  @Column({ name: 'verse_id', nullable: false })
  verseId!: number;

  @Column({ type: 'int', nullable: false })
  score!: number;

  @Column({ type: 'float', nullable: false })
  percent!: number;

  @ManyToOne(() => Verse, (verse: Verse) => verse.characterizations)
  @JoinColumn({ name: 'verse_id' })
  verse!: VerseCharacterization;
}
