import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService as Jwt } from '@nestjs/jwt'
import { jwtConfig } from './jwt.options'
import {
  AccessToken,
  IJwtService,
  JwtToken,
  JwtType,
  RefreshToken,
} from 'core/services/jwt-service.abstract'

@Injectable()
export class JwtService implements IJwtService {
  constructor(private jwtService: Jwt) {}

  public async getTokens(sub: string): Promise<AccessToken & RefreshToken> {
    const [access, refresh] = await Promise.all([
      this.generateJwt(sub, 'access'),
      this.generateJwt(sub, 'refresh'),
    ])

    return { access, refresh }
  }

  public async generateJwt(sub: string, type: JwtType): Promise<string> {
    const secret = jwtConfig[type].secret
    const expiresIn = jwtConfig[type].expires
    const tokenPayload: JwtToken = {
      type,
      sub,
    }
    const token = await this.jwtService.signAsync(tokenPayload, {
      secret,
      expiresIn,
    })

    return token
  }

  public async verify(
    token: string,
    type: JwtType,
    ignoreExpiration: boolean = false,
  ): Promise<string> {
    const secret = jwtConfig[type].secret
    try {
      const verifiedToken = await this.jwtService.verifyAsync<Promise<JwtToken>>(token, {
        secret,
        ignoreExpiration,
      })
      return verifiedToken.sub
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
