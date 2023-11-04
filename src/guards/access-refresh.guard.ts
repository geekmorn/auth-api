import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from 'services/http';
import { ValidatorService } from 'services/validator';

@Injectable()
export class AccessRefreshGuard implements CanActivate {
  private httpService: HttpService;
  private validatorService: ValidatorService;

  constructor() {
    this.httpService = new HttpService();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const access = this.httpService.extractHeader('authorization', request);
    const refresh = this.httpService.extractCookie('refreshToken', request);

    return true;
  }
}
