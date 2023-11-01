import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserPayload } from 'core/entities/user.entity';
import { z } from 'zod';

const regexUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const userPayloadSchema = z.object({
  id: z.string().regex(regexUUID, 'ID field must be in type UUID'),
  password: z.string().min(4),
});

export class UserPayloadPipe implements PipeTransform {
  transform(value: UserPayload) {
    try {
      userPayloadSchema.parse(value);
    } catch (error) {
      throw new BadRequestException(error['issues']);
    }

    return value;
  }
}
