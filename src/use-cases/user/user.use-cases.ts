import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserPayload } from 'core/entities/user.entity';
import { IUserRepository } from 'core/repositories/user-repository.abstract';
import { IUserUseCases } from 'core/use-cases/user-use-cases.abstract';
import { bcrypt } from 'utils';

@Injectable()
export class UserUseCases implements IUserUseCases {
  constructor(private userRepository: IUserRepository) {}

  async getUserIfExistsOr404(id: string) {
    const user = await this.userRepository.fetchById(id);
    if (!user) {
      throw new NotFoundException(`Instance of given user doesn't exist`);
    }
    return user;
  }

  async checkPasswordCorrectnessOr401(
    password: string,
    encryptedPassword: string,
  ) {
    const isPasswordVerified = await bcrypt.verify(password, encryptedPassword);
    if (!isPasswordVerified) {
      throw new UnauthorizedException('You have entered an invalid password');
    }
    return isPasswordVerified;
  }

  async fetchAll() {
    return await this.userRepository.fetchAll();
  }

  async createAndSaveUser(payload: UserPayload) {
    const encryptedPassword = await bcrypt.encrypt(payload.password);
    payload.password = encryptedPassword;
    return await this.userRepository.createNew(payload);
  }
}
