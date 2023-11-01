import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenRefresh {
  constructor() {}

  @Put('refresh')
  checkAndRefreshTokens(): string {
    return 'Hello World!';
  }
}
