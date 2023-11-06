import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { HttpExteption, AccessToken } from 'dtos/authen.dto';
import { Response } from 'express';
import { UserPayloadPipe } from 'pipes/user-payload.pipe';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthSignIn {
  constructor(
    private authUseCases: AuthUseCases,
    private userUseCases: UserUseCases,
  ) {}

  @ApiOperation({ summary: 'Login to existing profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    type: AccessToken,
  })
  @ApiResponse({
    status: 400,
    description: 'Some fields are entered incorrectly',
    type: HttpExteption,
  })
  @ApiResponse({
    status: 401,
    description: 'The entered password is invalid',
    type: HttpExteption,
  })
  @ApiResponse({
    status: 404,
    description: `Instance of given user doesn't exist`,
    type: HttpExteption,
  })
  @HttpCode(200)
  @Post('sign-in')
  async signInUser(
    @Body(new UserPayloadPipe('id')) userPayload: UserPayload,
    @Res() res: Response,
  ) {
    const user = await this.userUseCases.getUserIfExistsOr404(userPayload.id);
    await this.userUseCases.checkPasswordCorrectnessOr401(
      userPayload.password,
      user.password,
    );

    const tokens = await this.authUseCases.generateTokens(user.id);
    await this.authUseCases.setRefreshTokenToCookie(tokens.refresh, res);

    return res.send({ accessToken: tokens.access });
  }
}
