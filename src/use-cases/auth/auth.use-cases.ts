import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'core/entities/user.entity';
import { TokenRepository } from 'core/repositories';
import { IAuthUseCases } from 'core/use-cases/auth-use-cases.abstract';
import { JwtService } from 'services/jwt';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
  ) {}

  async saveRefreshToken(refresh: string, user: User): Promise<void> {
    const refreshPayload = {
      refreshToken: refresh,
      userId: user.id,
      user,
    };
    await this.tokenRepository.createNew(refreshPayload);
  }

  async updateOrSaveRefreshToken(refresh: string, user: User): Promise<void> {
    const token = await this.tokenRepository.getByUserId(user.id);
    if (!token) {
      await this.saveRefreshToken(refresh, user);
    } else {
      await this.tokenRepository.updateRefreshToken(token, refresh);
    }
  }

  async checkIfRefreshTokenIsExistsOr401(refresh: string): Promise<void> {
    const savedToken = await this.tokenRepository.getByToken(refresh);
    if (!savedToken) {
      throw new UnauthorizedException('Update of access keys is unavailable');
    }
  }

  async checkRefreshTokenCorretnessOr401(
    refresh: string,
    sub: string,
  ): Promise<void> {
    const verifiedToken = await this.jwtService.verify(refresh, 'refresh');
    if (verifiedToken !== sub) {
      throw new UnauthorizedException('Update of access keys is unavailable');
    }
  }
}
