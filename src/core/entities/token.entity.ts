import { User } from './user.entity';

export type Token = {
  refreshToken: string;
  userId: string;
  user: User;
};

export type TokenCreate = Token;
