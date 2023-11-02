import { Injectable } from '@nestjs/common';
import { User } from 'core/entities/user.entity';
import { ITokenRepository } from 'core/repositories';
import { AccessToken, RefreshToken } from 'core/services/jwt.service.abstract';
import { IAuthenUseCases } from 'core/use-cases/authen.use-cases.abstract';
import { Response } from 'express';
import { HttpService } from 'services/http';
import { JwtService } from 'services/jwt';

@Injectable()
export class AuthenUseCases implements IAuthenUseCases<Response> {
  constructor(
    private tokenRepository: ITokenRepository,
    private httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  async createAndSaveRefreshToken(refresh: string, user: User) {
    const refreshPayload = {
      refreshToken: refresh,
      userId: user.id,
      user,
    };
    await this.tokenRepository.createNew(refreshPayload);
  }

  async setRefreshTokenToCookie(refresh: string, response: Response) {
    this.httpService.setCookie('refreshToken', refresh, response);
  }

  async getAccessAndRefreshTokens(
    sub: string,
  ): Promise<AccessToken & RefreshToken> {
    return await this.jwtService.getTokens(sub);
  }
}
