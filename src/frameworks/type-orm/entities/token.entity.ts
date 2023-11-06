import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  refreshToken: string;
  @Column()
  userId: string;
  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
