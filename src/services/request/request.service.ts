import { Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  // @ts-expect-error no need
  #refreshToken: string | null
  // @ts-expect-error no need
  #userId: string

  get refreshToken(): string | null {
    return this.#refreshToken
  }
  set refreshToken(value: string | null) {
    this.#refreshToken = value
  }

  get userId(): string {
    return this.#userId
  }
  set userId(value: string) {
    this.#userId = value
  }
}
