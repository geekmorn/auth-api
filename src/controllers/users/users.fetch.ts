import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from 'services/jwt';
import { UserUseCase } from 'use-cases/user/user.use-cases';
import { apiTag, url, bcrypt } from 'utils';

@ApiTags(apiTag.user)
@Controller(url.users)
export class UsersFetch {
  constructor(
    private user: UserUseCase,
    private jwt: JwtService,
  ) {}

  @Get('fetch')
  async fetchAllUsers() {
    return await bcrypt.encrypt('asd');
  }
}
