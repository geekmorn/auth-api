import { Token, TokenCreate } from '../entities/token.entity';

export abstract class ITokenRepository {
  abstract fetchAll(): Promise<Token[]>;
  abstract fetchByToken(refreshToken: string): Promise<Token>;
  abstract createNew(payload: TokenCreate): Promise<Token>;
}
