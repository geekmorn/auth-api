import { Controller, HttpCode, HttpStatus, Put, Res, UnauthorizedException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AccessToken, HttpExteption } from 'dtos/auth.dto'
import { Response } from 'express'
import { HttpService } from 'services/http'
import { JwtService } from 'services/jwt'
import { RequestService } from 'services/request'
import { AuthUseCases } from 'use-cases/auth/auth.use-cases'
import { UserUseCases } from 'use-cases/user/user.use-cases'
import { apiTag, url } from 'utils'

@ApiTags(apiTag.auth)
@Controller(url.auth)
export class AuthRefresh {
  constructor(
    private authUseCases: AuthUseCases,
    private userService: UserUseCases,
    private requestServise: RequestService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  @ApiOperation({ summary: 'Updating your access permission' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Permission successfully updated',
    type: AccessToken,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Update of access keys is unavailable',
    type: HttpExteption,
  })
  @HttpCode(HttpStatus.OK)
  @Put(url.refresh)
  public async checkAndRefreshTokens(@Res() res: Response) {
    const { userId, refreshToken } = this.requestServise
    if (!refreshToken) {
      throw new UnauthorizedException('Update of access keys is unavailable')
    }

    await this.authUseCases.checkIfRefreshTokenExistsOr401(refreshToken)
    await this.authUseCases.checkRefreshTokenCorretnessOr401(refreshToken, userId)

    const user = await this.userService.getUserIfExistsOr404(userId)
    const tokens = await this.jwtService.getTokens(userId)
    await this.authUseCases.updateOrSaveRefreshToken(tokens.refresh, user)
    await this.httpService.setCookie('refreshToken', tokens.refresh, res)

    return res.send({ accessToken: tokens.access })
  }
}
