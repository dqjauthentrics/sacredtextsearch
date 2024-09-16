import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Verse } from './verse';

@Entity('chapter')
export class Chapter {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'book_id', type: 'tinyint', nullable: true })
  bookId!: number;

  @Column({ name: 'translation_id', type: 'int', nullable: true })
  translationId!: number;

  @Column({ name: 'chapter_number', type: 'tinyint', nullable: true })
  chapterNumber!: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  name!: string;

  // Not related by key.
  verses?: Array<Verse>;
}
