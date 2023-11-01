import { Injectable } from '@nestjs/common';
import { UserPayload } from 'core/entities/user.entity';
import { IUserRepository } from 'core/repositories/user.repository.abstract';
import { IUserUseCases } from 'core/use-cases/user.use-cases.abstract';
import { bcrypt } from 'utils';

@Injectable()
export class UserUseCases implements IUserUseCases {
  constructor(private userRepository: IUserRepository) {}

  async checkPasswordCorrectness(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.verify(password, encryptedPassword);
  }

  async fetchAll() {
    return await this.userRepository.fetchAll();
  }

  async createAndSave(payload: UserPayload) {
    return await this.userRepository.createNew(payload);
  }
}
