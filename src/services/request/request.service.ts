import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  #refreshToken: string;
  #userId: string;

  get refreshToken(): string {
    return this.#refreshToken;
  }
  set refreshToken(value: string) {
    this.#refreshToken = value;
  }

  get userId(): string {
    return this.#userId;
  }
  set userId(value: string) {
    this.#userId = value;
  }
}
