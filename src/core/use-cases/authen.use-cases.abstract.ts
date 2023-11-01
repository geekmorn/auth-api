import { User } from 'core/entities/user.entity';
import { AccessToken, RefreshToken } from 'core/services/jwt.service.abstract';

export abstract class IAuthenUseCases<Res> {
  abstract createAndSaveRefreshToken(
    refresh: string,
    user: User,
  ): Promise<void>;
  abstract setRefreshTokenToCookie(
    refresh: string,
    response: Res,
  ): Promise<void>;
  abstract getAccessAndRefreshTokens(
    sub: string,
  ): Promise<AccessToken & RefreshToken>;
}
