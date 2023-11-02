import { User, UserPayload } from 'core/entities/user.entity';

export abstract class IUserUseCases {
  abstract createAndSaveUser(payload: UserPayload): Promise<User>;
  abstract checkPasswordCorrectness(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean>;
  abstract checkIfUserExists(id: string): Promise<User>;
}
