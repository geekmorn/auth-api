import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { HttpExteption, AccessToken } from 'dtos/authen.dto';
import { Response } from 'express';
import { UserPayloadPipe } from 'pipes/user.payload.pipe';
import { AuthenUseCases } from 'use-cases/authen/authen.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenSignUp {
  constructor(
    private userUseCases: UserUseCases,
    private authenUseCases: AuthenUseCases,
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
    const tokens = await this.authenUseCases.getAccessAndRefreshTokens(user.id);

    await this.authenUseCases.createAndSaveRefreshToken(tokens.refresh, user);
    await this.authenUseCases.setRefreshTokenToCookie(tokens.refresh, res);

    return res.send({ accessToken: tokens.access });
  }
}
