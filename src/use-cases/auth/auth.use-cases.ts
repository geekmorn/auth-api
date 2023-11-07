import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'core/entities/user.entity';
import { TokenRepository } from 'core/repositories';
import { AccessToken, RefreshToken } from 'core/services/jwt-service.abstract';
import { IAuthUseCases } from 'core/use-cases/auth-use-cases.abstract';
import { Response } from 'express';
import { HttpService } from 'services/http';
import { JwtService } from 'services/jwt';

@Injectable()
export class AuthUseCases implements IAuthUseCases<Response> {
  constructor(
    private tokenRepository: TokenRepository,
    private httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  async updateRefreshTokenInDB(
    refresh: string,
    newRefresh: string,
    user: User,
  ) {
    const token = await this.tokenRepository.fetchByToken(refresh);
    if (token === null) {
      await this.createAndSaveRefreshToken(newRefresh, user);
    } else {
      await this.tokenRepository.updateRefreshToken(token, newRefresh);
    }
  }

  async createAndSaveRefreshToken(refresh: string, user: User) {
    const refreshPayload = {
      refreshToken: refresh,
      userId: user.id,
      user,
    };
    await this.tokenRepository.createNew(refreshPayload);
  }

  async setRefreshTokenToCookie(refresh: string, response: Response) {
    await this.httpService.setCookie('refreshToken', refresh, response);
  }

  async generateTokens(sub: string): Promise<AccessToken & RefreshToken> {
    return await this.jwtService.getTokens(sub);
  }

  async verifyRefreshTokenOr401(refresh: string) {
    const savedToken = await this.tokenRepository.fetchByToken(refresh);
    if (refresh !== savedToken.refreshToken) {
      throw new UnauthorizedException('Update of access keys is available');
    }
    const userId = await this.jwtService.verify(refresh, 'refresh');

    return userId;
  }
}
