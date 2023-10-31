import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Item extends BaseEntity {
  @Column()
  password: string;
}
