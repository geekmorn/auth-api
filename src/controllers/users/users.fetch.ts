import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from 'services/jwt';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersFetch {
  constructor(
    private userUseCase: UserUseCases,
    private jwt: JwtService,
  ) {}

  @Get('fetch')
  async fetchAllUsers() {
    return await this.userUseCase.fetchAll();
  }
}
