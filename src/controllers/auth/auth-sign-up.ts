import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { HttpExteption, AccessToken } from 'dtos/authen.dto';
import { Response } from 'express';
import { UserPayloadPipe } from 'pipes/user-payload.pipe';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.auth)
@Controller(url.auth)
export class AuthSignUp {
  constructor(
    private userUseCases: UserUseCases,
    private authUseCases: AuthUseCases,
  ) {}

  @ApiOperation({ summary: 'Registering a new profile' })
  @ApiResponse({
    status: 201,
    description: 'Successfully signed up',
    type: AccessToken,
  })
  @ApiResponse({
    status: 400,
    description: 'Some fields are entered incorrectly',
    type: HttpExteption,
  })
  @Post('sign-up')
  async signUpUser(
    @Body(UserPayloadPipe) userPayload: UserPayload,
    @Res() res: Response,
  ) {
    const user = await this.userUseCases.createAndSaveUser(userPayload);
    const tokens = await this.authUseCases.generateTokens(user.id);

    await this.authUseCases.createAndSaveRefreshToken(tokens.refresh, user);
    await this.authUseCases.setRefreshTokenToCookie(tokens.refresh, res);

    return res.send({ accessToken: tokens.access });
  }
}
