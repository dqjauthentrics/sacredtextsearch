import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_query')
export class UserQuery {
  @PrimaryColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  terms!: string;

  @Column({ name: 'usage_count', type: 'int', nullable: false })
  usageCount!: number;

  @Column({ name: 'n_hits', type: 'tinyint', nullable: false })
  nHits!: number;
}
