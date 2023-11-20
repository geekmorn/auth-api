import { User, UserPayload } from 'core/entities/user.entity'

export abstract class IUserRepository {
  abstract getAll(): Promise<User[]>
  abstract getById(id: string): Promise<User | null>
  abstract createNew(payload: UserPayload): Promise<User>
}
