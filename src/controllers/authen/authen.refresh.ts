import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from 'services/http';
import { apiTag, url } from 'utils';

@ApiTags(apiTag.authen)
@Controller(url.authen)
export class AuthenRefresh {
  constructor(private http: HttpService) {}

  @Put('refresh')
  async checkAndRefreshTokens() {
    return;
  }
}
