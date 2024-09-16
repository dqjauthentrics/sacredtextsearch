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

@Entity('translation')
export class Translation {
  @PrimaryColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  language!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  abbreviation!: string;

  @Column({ name: 'info_url', type: 'varchar', length: 2048, nullable: true })
  infoUrl!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  publisher!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  copyright!: string;

  @Column({
    name: 'copyright_info',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  copyrightInfo!: string;

  @Column({
    name: 'screenshot_url',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  screenshotUrl!: string;

  @Column({
    name: 'data_source',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  dataSource!: string;

  @Column({ name: 'is_default', type: 'tinyint', nullable: false })
  isDefault!: number;

  @Column({ type: 'smallint', name: 'tome_id', nullable: false })
  tomeId!: number;

  @ManyToOne(() => Tome, (tome: Tome) => tome.translations)
  @JoinColumn({ name: 'tome_id' })
  tome!: Tome;

  @OneToMany(() => Verse, (verse: Verse) => verse.translation)
  verses!: Verse[];
}
