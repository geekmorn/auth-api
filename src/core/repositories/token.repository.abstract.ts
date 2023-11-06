import { Token, TokenCreate } from '../entities/token.entity';

export abstract class ITokenRepository {
  abstract fetchByToken(refreshToken: string): Promise<Token>;
  abstract delete(refreshToken: string): Promise<Token>;
  abstract createNew(payload: TokenCreate): Promise<Token>;
  abstract updateRefreshToken(
    tokenEntity: Token,
    newRefreshToken: string,
  ): Promise<Token>;
}
