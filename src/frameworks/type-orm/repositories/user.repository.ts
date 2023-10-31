import { UserCreate } from 'core/entities/user.entity';
import { IUserRepository } from 'core/repositories/user.repository';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async fetchAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async fetchById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createNew(payload: UserCreate): Promise<User> {
    const createdUser = this.userRepository.create(payload);
    const newUser = await this.userRepository.save(createdUser);
    return newUser;
  }
}