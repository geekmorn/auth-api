import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpService } from 'services/http';
import { JwtService } from 'services/jwt';
import { RequestService } from 'services/request';
import { ValidatorService } from 'services/validation';
import { AccessHeaderStrategy } from 'services/validation/strategies';
import { ValidatorName } from 'services/validation/validator.options';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private requestService: RequestService,
    private httpService: HttpService,
    private validator: ValidatorService,
    private jwtService: JwtService,
  ) {
    this.validator.use({
      [ValidatorName.accessHeader]: new AccessHeaderStrategy(),
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const access = await this.httpService.extractHeader('authorization', req);
    const refresh = await this.httpService.extractCookie('refreshToken', req);
    const validatedAccess = await this.validator.validate(
      ValidatorName.accessHeader,
      access,
    );

    const userId = await this.jwtService.verify(validatedAccess, 'access');
    this.requestService.refreshToken = refresh;
    this.requestService.userId = userId;

    next();
  }
}
