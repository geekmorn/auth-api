import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserPayload } from 'core/entities/user.entity';
import {
  userIdSchema,
  userPayloadSchema,
} from 'utils/zod-chemas/user-payload.schema';

// TODO Get rid of if's

type UserSchemaType = 'id' | 'user';
export class UserPayloadPipe implements PipeTransform {
  constructor(private schemaType: UserSchemaType = 'user') {}

  transform(value: UserPayload) {
    try {
      if (this.schemaType === 'id') {
        userIdSchema.parse(value);
      }
      if (this.schemaType === 'user') {
        userPayloadSchema.parse(value);
      }
    } catch (error) {
      throw new BadRequestException(error['issues']);
    }

    return value;
  }
}
