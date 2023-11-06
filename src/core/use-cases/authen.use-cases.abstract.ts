import { User } from 'core/entities/user.entity';
import { AccessToken, RefreshToken } from 'core/services/jwt.service.abstract';

export abstract class IAuthenUseCases<Res> {
  abstract createAndSaveRefreshToken(
    refresh: string,
    user: User,
  ): Promise<void>;
  abstract updateRefreshTokenInDB(
    refresh: string,
    newRefresh: string,
    user: User,
  ): Promise<void>;
  abstract setRefreshTokenToCookie(
    refresh: string,
    response: Res,
  ): Promise<void>;
  abstract generateTokens(sub: string): Promise<AccessToken & RefreshToken>;
  abstract verifyRefreshTokenOr401(refresh: string): Promise<string>;
}
