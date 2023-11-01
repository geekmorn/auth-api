import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenSignIn {
  @Post('sign-in')
  signInUser(): string {
    return 'Hello World!';
  }
}
