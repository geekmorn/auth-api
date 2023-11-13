import { Token, TokenCreate } from '../entities/token.entity';

export abstract class TokenRepository {
  abstract getByUserId(userId: string): Promise<Token | null>;
  abstract getByToken(refreshToken: string): Promise<Token | null>;
  abstract getAll(): Promise<Token[]>;
  abstract delete(refreshToken: string): Promise<Token>;
  abstract createNew(payload: TokenCreate): Promise<Token>;
  abstract updateRefreshToken(
    tokenEntity: Token,
    newRefreshToken: string,
  ): Promise<Token>;
}
