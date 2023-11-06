import { User, UserPayload } from 'core/entities/user.entity';

export abstract class IUserUseCases {
  abstract createAndSaveUser(payload: UserPayload): Promise<User>;
  abstract checkPasswordCorrectnessOr401(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean>;
  abstract getUserIfExistsOr404(id: string): Promise<User>;
}
