import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private _refreshToken: string;
  private _userId: string;

  get refreshToken(): string {
    return this._refreshToken;
  }
  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }

  get userId(): string {
    return this._userId;
  }
  set userId(userId: string) {
    this._userId = userId;
  }
}
