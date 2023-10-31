import { Injectable } from '@nestjs/common';
import { UserCreate } from 'core/entities/user.entity';
import { IUserRepository } from 'core/repositories/user.repository';

@Injectable()
export class UserUseCase {
  constructor(private users: IUserRepository) {}

  async fetchAll() {
    return await this.users.fetchAll();
  }

  async fetchById(id: string) {
    return await this.users.fetchById(id);
  }

  async create(payload: UserCreate) {
    return await this.users.createNew(payload);
  }
}
