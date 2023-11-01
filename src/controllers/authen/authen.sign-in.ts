import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'dtos';
import { UserPayloadPipe } from 'pipes/user.payload.pipe';
import { AuthenUseCases } from 'use-cases/authen/authen.use-cases';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenSignIn {
  constructor(private authenUseCases: AuthenUseCases) {}

  @HttpCode(200)
  @Post('sign-in')
  async signInUser(@Body(UserPayloadPipe) userPayload: UserPayload) {
    return userPayload;
  }
}
