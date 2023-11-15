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
    const [userId, currentRefresh] = [
      this.requestServise.userId,
      this.requestServise.refreshToken,
    ];
    await this.authUseCases.checkIfRefreshTokenIsExistsOr401(currentRefresh);
    await this.authUseCases.checkRefreshTokenCorretnessOr401(
      currentRefresh,
      userId,
    );

    return 'userId';
  }
}
