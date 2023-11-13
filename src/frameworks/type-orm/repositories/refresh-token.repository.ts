import { Repository } from 'typeorm';
import { Token } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from 'core/repositories/token-repository.abstract';
import { TokenCreate } from 'core/entities/token.entity';

export class RefreshTokenRepository implements TokenRepository {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async delete(refreshToken: string): Promise<Token> {
    const token = await this.tokenRepository.findOneBy({ refreshToken });
    return await this.tokenRepository.remove(token);
  }

  async updateRefreshToken(
    tokenEntity: Token,
    newRefreshToken: string,
  ): Promise<Token> {
    tokenEntity.refreshToken = newRefreshToken;
    return await this.tokenRepository.save(tokenEntity);
  }

  async getAll() {
    return await this.tokenRepository.find();
  }

  async getByUserId(userId: string): Promise<Token | null> {
    const token = await this.tokenRepository.findOneBy({ userId });
    return token;
  }

  async getByToken(refreshToken: string): Promise<Token | null> {
    const token = await this.tokenRepository.findOneBy({
      refreshToken,
    });
    return token;
  }

  async createNew(payload: TokenCreate): Promise<Token> {
    const createdToken = this.tokenRepository.create(payload);
    const savedToken = await this.tokenRepository.save(createdToken);
    return savedToken;
  }
}
