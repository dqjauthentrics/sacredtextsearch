import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Translation } from './translation';
import { Book } from './book';
import { Religion } from './religion';

@Entity('tome')
export class Tome {
  @PrimaryColumn({ type: 'smallint' })
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ name: 'has_translations', type: 'tinyint', nullable: true })
  hasTranslations!: number;

  @Column({ name: 'sort_order', type: 'tinyint' })
  sortOrder!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  abbreviation!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  icon!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  color!: string;

  @Column({ name: 'religion_id', type: 'smallint', nullable: false })
  religionId!: number;

  @OneToMany(() => Translation, (translation: Translation) => translation.tome)
  translations!: Translation[];

  @OneToMany(() => Book, (book: Book) => book.tome)
  books!: Book[];

  @ManyToOne(() => Religion, (religion) => religion.tomes)
  @JoinColumn({ name: 'religion_id' })
  religion!: Religion;
}
