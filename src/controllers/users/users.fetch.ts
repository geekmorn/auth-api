import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenUseCases } from 'use-cases/authen/authen.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersFetch {
  constructor(
    private userUseCase: UserUseCases,
    private authen: AuthenUseCases,
  ) {}

  @Get('fetch')
  async fetchAllUsers() {
    return await this.userUseCase.fetchAll();
  }
}
