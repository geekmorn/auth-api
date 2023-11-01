import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { jwtConfig } from './jwt.options';
import {
  AccessToken,
  IJwtService,
  JwtType,
  RefreshToken,
} from 'core/services/jwt.service.abstract';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private jwtService: Jwt) {}

  async getTokens(sub: string): Promise<AccessToken & RefreshToken> {
    const [access, refresh] = await Promise.all([
      this.generateJwt(sub, 'access'),
      this.generateJwt(sub, 'refresh'),
    ]);

    return { access, refresh };
  }

  async generateJwt(sub: string, type: JwtType): Promise<string> {
    const secret = jwtConfig[type].secret;
    const expiresIn = jwtConfig[type].expires;
    const token = await this.jwtService.signAsync(
      { sub },
      { secret, expiresIn },
    );

    return token;
  }

  async verify(token: string, type: JwtType): Promise<string | void> {
    const secret = jwtConfig[type].secret;
    const sub = await this.jwtService
      .verifyAsync<Promise<string>>(token, {
        secret,
      })
      .catch((error) => {
        throw new UnauthorizedException(error);
      });

    return sub;
  }
}
