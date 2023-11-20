import { Repository } from 'typeorm'
import { Token } from '../entities'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenRepository } from 'core/repositories/token-repository.abstract'
import { TokenCreate } from 'core/entities/token.entity'

export class RefreshTokenRepository implements TokenRepository {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  public async delete(refreshToken: Token): Promise<Token> {
    return await this.tokenRepository.remove(refreshToken)
  }

  public async updateRefreshToken(tokenEntity: Token, newRefreshToken: string): Promise<Token> {
    tokenEntity.refreshToken = newRefreshToken
    return await this.tokenRepository.save(tokenEntity)
  }

  public async getAll() {
    return await this.tokenRepository.find()
  }

  public async getByUserId(userId: string): Promise<Token | null> {
    const token = await this.tokenRepository.findOneBy({ userId })
    return token
  }

  public async getByToken(refreshToken: string): Promise<Token | null> {
    const token = await this.tokenRepository.findOneBy({
      refreshToken,
    })
    return token
  }

  public async createNew(payload: TokenCreate): Promise<Token> {
    const createdToken = this.tokenRepository.create(payload)
    const savedToken = await this.tokenRepository.save(createdToken)
    return savedToken
  }
}
