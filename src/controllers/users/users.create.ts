import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersCreate {
  constructor(private users: UserUseCases) {}

  @Get('create')
  async getCat() {
    return await this.users.createAndSave({ password: 'asd' });
  }
}
