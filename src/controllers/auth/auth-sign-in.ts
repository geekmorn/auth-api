import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { HttpExteption, AccessToken } from 'dtos/auth.dto';
import { Response } from 'express';
import { UserPayloadPipe } from 'pipes/user-payload/user-payload.pipe';
import { HttpService } from 'services/http';
import { JwtService } from 'services/jwt';
import { AuthUseCases } from 'use-cases/auth/auth.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.auth)
@Controller(url.auth)
export class AuthSignIn {
  constructor(
    private authUseCases: AuthUseCases,
    private userUseCases: UserUseCases,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  @ApiOperation({ summary: 'Login to existing profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully signed in',
    type: AccessToken,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Some fields are entered incorrectly',
    type: HttpExteption,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The entered password is invalid',
    type: HttpExteption,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `Instance of given user doesn't exist`,
    type: HttpExteption,
  })
  @HttpCode(HttpStatus.OK)
  @Post(url.signIn)
  async signInUser(
    @Body(new UserPayloadPipe('id')) userPayload: UserPayload,
    @Res() res: Response,
  ) {
    const user = await this.userUseCases.getUserIfExistsOr404(userPayload.id);
    await this.userUseCases.checkPasswordCorrectnessOr401(
      userPayload.password,
      user.password,
    );

    const tokens = await this.jwtService.getTokens(user.id);
    await this.authUseCases.updateOrSaveRefreshToken(tokens.refresh, user);
    await this.httpService.setCookie('refreshToken', tokens.refresh, res);

    return res.send({ accessToken: tokens.access });
  }
}
