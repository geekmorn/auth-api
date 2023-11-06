import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserPayload } from 'core/entities/user.entity';
import { z } from 'zod';

const regexUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const userPayloadSchema = z.object({
  id: z.string().regex(regexUUID, 'ID field must be in type UUID'),
  password: z.string().min(4),
});

// TODO Change the id field
const userIdSchema = userPayloadSchema.omit({ password: true });

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
