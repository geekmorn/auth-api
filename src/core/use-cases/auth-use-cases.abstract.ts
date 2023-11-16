import { User } from 'core/entities/user.entity';

export abstract class IAuthUseCases {
  abstract saveRefreshToken(refreshToken: string, user: User): Promise<void>;
  abstract updateOrSaveRefreshToken(
    refreshToken: string,
    user: User,
  ): Promise<void>;
  abstract checkIfRefreshTokenExistsOr401(refreshToken: string): Promise<void>;
  abstract checkRefreshTokenCorretnessOr401(
    refreshToken: string,
    sub: string,
  ): Promise<void>;
}
