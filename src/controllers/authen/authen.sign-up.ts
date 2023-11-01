import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreate } from 'dtos';
import { Response } from 'express';
import { JwtService } from 'services/jwt';
import { TokenUseCases } from 'use-cases/token/token.use-cases';
import { UserUseCases } from 'use-cases/user/user.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenSignUp {
  constructor(
    private jwtSerivce: JwtService,
    private userUseCases: UserUseCases,
    private tokenUseCases: TokenUseCases,
  ) {}

  @Post('sign-up')
  async signUpUser(@Body() payload: UserCreate, @Res() res: Response) {
    const user = await this.userUseCases.createAndSave(payload);
    const { access, refresh } = await this.jwtSerivce.getTokens(user.id);
    const newPayload = {
      refreshToken: refresh,
      userId: 'asd',
      user,
    };
    await this.tokenUseCases.createAndSave(newPayload);
    this.jwtSerivce.setCookie(refresh, res);

    return res.send({ accessToken: access });
  }
}
