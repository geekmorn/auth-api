import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserUseCase } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersCreate {
  constructor(private users: UserUseCase) {}

  @Get('create')
  async getCat() {
    return await this.users.create({ password: 'asd' });
  }
}
