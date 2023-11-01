import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryColumn()
  refreshToken: string;
  @Column()
  userId: string;
  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
