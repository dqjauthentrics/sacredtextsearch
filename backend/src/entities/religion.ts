import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Tome } from './tome';

@Entity('religion')
export class Religion {
  @PrimaryColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  adherents!: string;

  @Column({ type: 'varchar', length: 4096 })
  description!: string;

  @Column({ name: 'parent_id', type: 'smallint', nullable: true })
  parentId!: number;

  @Column({ name: 'sort_order', type: 'tinyint', nullable: true })
  sortOrder!: number;

  @OneToMany(() => Tome, (tome: Tome) => tome.religion)
  tomes!: Tome[];

  @ManyToOne(() => Religion, (religion) => religion.children)
  @JoinColumn({ name: 'parent_id' })
  parent!: Religion;

  @OneToMany(() => Religion, (religion) => religion.parent)
  @JoinColumn({ name: 'parent_id' })
  children!: Religion[];
}
