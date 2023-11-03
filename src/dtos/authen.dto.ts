import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty()
  accessToken: string;
}

export class HttpExteption {
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
  @ApiProperty()
  statusCode: number;
}
