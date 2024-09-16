import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sysinfo')
export class Sysinfo {
  @PrimaryColumn({ type: 'smallint' })
  id!: number;

  @Column({
    name: 'last_collection_update',
    type: 'timestamp',
    nullable: false,
  })
  lastCollectionUpdate!: number;
}
