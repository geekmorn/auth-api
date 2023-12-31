import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { HttpService } from 'services/http'
import { JwtService } from 'services/jwt'
import { RequestService } from 'services/request'
import { ValidatorService } from 'services/validator'
import { AccessHeaderStrategy } from 'services/validator/strategies'
import { url } from 'utils'

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private authRefreshUrl = `/${url.auth}/${url.refresh}` as const

  constructor(
    private requestService: RequestService,
    private httpService: HttpService,
    private validator: ValidatorService,
    private jwtService: JwtService,
  ) {
    this.validator.attachStrategies([new AccessHeaderStrategy()])
  }

  public async use(req: Request, res: Response, next: NextFunction) {
    const access = await this.httpService.extractHeader('authorization', req)
    const refresh = await this.httpService.extractCookie('refreshToken', req)
    const { validatedAccess, accessError } = await this.validator.validate('accessHeader', access)
    if (accessError) {
      throw new UnauthorizedException(accessError)
    }

    const ignoreExpiration = req.url === this.authRefreshUrl
    const userId = await this.jwtService.verify(validatedAccess, 'access', ignoreExpiration)
    this.requestService.refreshToken = refresh
    this.requestService.userId = userId

    next()
  }
}
