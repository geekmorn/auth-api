import { Injectable } from '@nestjs/common';
import { UserCreate } from 'core/entities/user.entity';

@Injectable()
export class AuthenUseCases {
  async signUpUser(payload: UserCreate) {
    return;
  }

  async signInUser() {}
}
