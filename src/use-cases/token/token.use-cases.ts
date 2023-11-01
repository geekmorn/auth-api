import { Injectable } from '@nestjs/common';
import { TokenCreate } from 'core/entities/token.entity';
import { ITokenRepository } from 'core/repositories';

@Injectable()
export class TokenUseCases {
  constructor(private token: ITokenRepository) {}

  async fetchAll() {
    return await this.token.fetchAll();
  }

  async fetchByToken(token: string) {
    return await this.token.fetchByToken(token);
  }

  async createAndSave(payload: TokenCreate) {
    return await this.token.createNew(payload);
  }
}
