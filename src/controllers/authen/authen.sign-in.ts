import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { HttpExteption, SignedIn } from 'dtos/authen.dto';
import { Response } from 'express';
import { UserPayloadPipe } from 'pipes/user.payload.pipe';
import { AuthenUseCases } from 'use-cases/authen/authen.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenSignIn {
  constructor(
    private authenUseCases: AuthenUseCases,
    private userUseCases: UserUseCases,
  ) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'Login to existing profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    type: SignedIn,
  })
  @ApiResponse({
    status: 400,
    description: 'Some fields are entered incorrectly',
    type: HttpExteption,
  })
  @ApiResponse({
    status: 404,
    description: `Instance of given user doesn't exist`,
    type: HttpExteption,
  })
  @Post('sign-in')
  async signInUser(
    @Body(new UserPayloadPipe('id')) userPayload: UserPayload,
    @Res() res: Response,
  ) {
    const user = await this.userUseCases.checkIfUserExists(userPayload.id);
    await this.userUseCases.checkPasswordCorrectness(
      userPayload.password,
      user.password,
    );

    const tokens = await this.authenUseCases.getAccessAndRefreshTokens(user.id);
    await this.authenUseCases.setRefreshTokenToCookie(tokens.refresh, res);

    return res.send({ accessToken: tokens.access });
  }
}
