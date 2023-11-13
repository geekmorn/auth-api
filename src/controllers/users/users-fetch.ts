import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersFetch {
  constructor(
    private userUseCase: UserUseCases,
    private auth: AuthUseCases,
  ) {}

  @Get('fetch')
  async fetchAllUsers() {
    return await this.userUseCase.fetchAllTokens();
  }
}
