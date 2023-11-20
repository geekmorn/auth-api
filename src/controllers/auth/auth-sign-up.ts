import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserPayload } from 'dtos'
import { HttpExteption, AccessToken } from 'dtos/auth.dto'
import { Response } from 'express'
import { UserPayloadPipe } from 'pipes/user-payload/user-payload.pipe'
import { HttpService } from 'services/http'
import { JwtService } from 'services/jwt'
import { AuthUseCases } from 'use-cases/auth/auth.use-cases'
import { UserUseCases } from 'use-cases/user/user.use-cases'
import { apiTag, url } from 'utils'

@ApiTags(apiTag.auth)
@Controller(url.auth)
export class AuthSignUp {
  constructor(
    private userUseCases: UserUseCases,
    private authUseCases: AuthUseCases,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  @ApiOperation({ summary: 'Registering a new profile' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully signed up',
    type: AccessToken,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Some fields are entered incorrectly',
    type: HttpExteption,
  })
  @Post(url.signUp)
  public async signUpUser(
    @Body(new UserPayloadPipe()) userPayload: UserPayload,
    @Res() res: Response,
  ) {
    const user = await this.userUseCases.createAndSaveUser(userPayload)
    const tokens = await this.jwtService.getTokens(user.id)

    await this.authUseCases.saveRefreshToken(tokens.refresh, user)
    await this.httpService.setCookie('refreshToken', tokens.refresh, res)

    return res.send({ accessToken: tokens.access })
  }
}
