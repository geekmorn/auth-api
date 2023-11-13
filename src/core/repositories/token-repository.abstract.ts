import { Token, TokenCreate } from '../entities/token.entity';

export abstract class TokenRepository {
  abstract getByToken(refreshToken: string): Promise<Token | null>;
  abstract delete(refreshToken: string): Promise<Token>;
  abstract createNew(payload: TokenCreate): Promise<Token>;
  abstract updateRefreshToken(
    tokenEntity: Token,
    newRefreshToken: string,
  ): Promise<Token>;
}
