import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Verse } from './verse';
import { Tome } from './tome';

@Entity('book')
export class Book {
  @PrimaryColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ name: 'genre_id', type: 'tinyint', nullable: true })
  genreId!: number;

  @Column({ name: 'sub_title', type: 'varchar', length: 100 })
  subTitle!: string;

  @Column({ name: 'source_id', type: 'int', nullable: true })
  sourceId!: number;

  @Column({ name: 'tome_id', type: 'smallint', nullable: false })
  tomeId!: number;

  @OneToMany(() => Verse, (verse: Verse) => verse.book)
  verses!: Verse[];

  @ManyToOne(() => Tome, (tome: Tome) => tome.books)
  @JoinColumn({ name: 'tome_id' })
  tome!: Tome;
}
