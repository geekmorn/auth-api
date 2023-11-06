import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestService } from 'services/request';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthRefresh {
  constructor(
    private authUseCases: AuthUseCases,
    private reqServise: RequestService,
  ) {}

  @Put('refresh')
  async checkAndRefreshTokens() {
    const userId = this.reqServise.userId;
    const refresh = this.reqServise.refreshToken;

    return userId;
  }
}
