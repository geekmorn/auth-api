import { ApiProperty } from '@nestjs/swagger';

export class SignedIn {
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
