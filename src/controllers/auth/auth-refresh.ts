import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestService } from 'services/request';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.auth)
@Controller(url.auth)
export class AuthRefresh {
  constructor(
    private authUseCases: AuthUseCases,
    private requestServise: RequestService,
  ) {}

  @Put(url.refresh)
  async checkAndRefreshTokens() {
    const { userId, refreshToken } = this.requestServise;

    await this.authUseCases.checkIfRefreshTokenExistsOr401(refreshToken);
    await this.authUseCases.checkRefreshTokenCorretnessOr401(
      refreshToken,
      userId,
    );

    return 'userId';
  }
}
