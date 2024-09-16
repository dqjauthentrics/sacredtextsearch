import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Book } from './book';
import { Translation } from './translation';
import { VerseCharacterization } from './verse-characterization';

@Entity('verse')
export class Verse {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'verse_number', type: 'int' })
  verseNumber!: number;

  @Column({ name: 'chapter_number', type: 'int' })
  chapterNumber!: number;

  @Column({ type: 'text' })
  body!: string;

  @Column({ name: 'compound_id', type: 'int', nullable: false })
  compoundId!: number;

  @Column({ name: 'book_id', nullable: false })
  bookId!: number;

  @Column({ name: 'translation_id', nullable: false })
  translationId!: number;

  @ManyToOne(() => Book, (book: Book) => book.verses)
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @ManyToOne(
    () => Translation,
    (translation: Translation) => translation.verses,
  )
  @JoinColumn({ name: 'translation_id' })
  translation!: Translation;

  @OneToMany(
    () => VerseCharacterization,
    (characterization: VerseCharacterization) => characterization.verse,
  )
  characterizations!: VerseCharacterization[];
}
