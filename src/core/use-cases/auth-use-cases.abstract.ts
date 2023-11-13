import { User } from 'core/entities/user.entity';

export abstract class IAuthUseCases {
  abstract saveRefreshToken(refresh: string, user: User): Promise<void>;
  abstract updateOrSaveRefreshToken(refresh: string, user: User): Promise<void>;
  abstract checkIfRefreshTokenIsExistsOr401(refresh: string): Promise<void>;
  abstract checkRefreshTokenCorretnessOr401(
    refresh: string,
    sub: string,
  ): Promise<void>;
}
