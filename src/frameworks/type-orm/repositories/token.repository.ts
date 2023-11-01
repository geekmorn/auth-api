import { Repository } from 'typeorm';
import { Token } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ITokenRepository } from 'core/repositories/token.repository';
import { TokenCreate } from 'core/entities/token.entity';

export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async fetchAll(): Promise<Token[]> {
    const tokens = await this.tokenRepository.find();
    return tokens;
  }

  async fetchByToken(refreshToken: string): Promise<Token> {
    const token = await this.tokenRepository.findOne({
      where: { refreshToken },
    });
    return token;
  }

  async createNew(payload: TokenCreate): Promise<Token> {
    const createdToken = this.tokenRepository.create(payload);
    const newToken = await this.tokenRepository.save(createdToken);
    return newToken;
  }
}
