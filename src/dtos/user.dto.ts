import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
  @ApiProperty({ default: 'UUID' })
  id: string;
  @ApiProperty()
  password: string;
}
