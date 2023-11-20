import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'core/entities/user.entity'
import { TokenRepository } from 'core/repositories'
import { IAuthUseCases } from 'core/use-cases/auth-use-cases.abstract'
import { JwtService } from 'services/jwt'

@Injectable()
export class AuthUseCases implements IAuthUseCases {
  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
  ) {}

  public async saveRefreshToken(refreshToken: string, user: User): Promise<void> {
    const refreshPayload = {
      refreshToken,
      userId: user.id,
      user,
    }
    await this.tokenRepository.createNew(refreshPayload)
  }

  public async updateOrSaveRefreshToken(refreshToken: string, user: User): Promise<void> {
    const token = await this.tokenRepository.getByUserId(user.id)
    if (!token) {
      await this.saveRefreshToken(refreshToken, user)
    } else {
      await this.tokenRepository.updateRefreshToken(token, refreshToken)
    }
  }

  public async checkIfRefreshTokenExistsOr401(refreshToken: string): Promise<void> {
    const savedToken = await this.tokenRepository.getByToken(refreshToken)
    if (!savedToken) {
      throw new UnauthorizedException('Update of access keys is unavailable')
    }
  }

  public async checkRefreshTokenCorretnessOr401(refreshToken: string, sub: string): Promise<void> {
    const verifiedToken = await this.jwtService.verify(refreshToken, 'refresh')
    if (verifiedToken !== sub) {
      throw new UnauthorizedException('Update of access keys is unavailable')
    }
  }
}
