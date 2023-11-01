import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { AccessToken, RefreshToken, JwtType, jwtConfig } from './jwt.options';
import { Response } from 'express';

@Injectable()
export class JwtService {
  constructor(private jwtService: Jwt) {}

  async getTokens(sub: string): Promise<AccessToken & RefreshToken> {
    const [access, refresh] = await Promise.all([
      this.generateToken(sub, 'access'),
      this.generateToken(sub, 'refresh'),
    ]);

    return { access, refresh };
  }

  async generateToken(sub: string, type: JwtType) {
    const secret = jwtConfig.secret[type];
    const expiresIn = jwtConfig.expires[type];
    const token = await this.jwtService.signAsync(
      { sub },
      { secret, expiresIn },
    );

    return token;
  }

  async verify(token: string, type: JwtType) {
    const secret = jwtConfig.secret[type];
    const sub = await this.jwtService
      .verifyAsync<Promise<string>>(token, {
        secret,
      })
      .catch((error) => {
        throw new UnauthorizedException(error);
      });

    return sub;
  }

  setCookie(token: string, response: Response): void {
    response.cookie('refreshToken', token);
  }
}
