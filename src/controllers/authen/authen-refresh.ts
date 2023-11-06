import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestService } from 'services/request';
import { AuthenUseCases } from 'use-cases/authen/authen.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenRefresh {
  constructor(
    private authenUseCases: AuthenUseCases,
    private reqServise: RequestService,
  ) {}

  @Put('refresh')
  async checkAndRefreshTokens() {
    const userId = this.reqServise.userId;
    const refresh = this.reqServise.refreshToken;

    return userId;
  }
}
