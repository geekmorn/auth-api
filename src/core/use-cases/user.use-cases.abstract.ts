import { User, UserPayload } from 'core/entities/user.entity';

export abstract class IUserUseCases {
  abstract createAndSave(payload: UserPayload): Promise<User>;
  abstract checkPasswordCorrectness(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean>;
}
