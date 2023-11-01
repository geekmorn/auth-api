import { User, UserCreate } from 'core/entities/user.entity';

export abstract class IUserRepository {
  abstract fetchAll(): Promise<User[]>;
  abstract fetchById(id: string): Promise<User>;
  abstract createNew(payload: UserCreate): Promise<User>;
  abstract ifExist(id: string): Promise<boolean>;
}
