import { UserPayload } from 'core/entities/user.entity';
import { IUserRepository } from 'core/repositories/user-repository.abstract';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async createNew(payload: UserPayload): Promise<User> {
    const createdUser = this.userRepository.create(payload);
    const newUser = await this.userRepository.save(createdUser);
    return newUser;
  }
}
