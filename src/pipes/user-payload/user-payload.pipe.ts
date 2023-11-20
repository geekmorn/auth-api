import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { UserPayload } from 'core/entities/user.entity'
import { userIdSchema, userPayloadSchema } from './user-payload.schema'
import { ZodError } from 'zod'

const userSchemas = {
  id: userIdSchema,
  user: userPayloadSchema,
}

type UserSchemaType = typeof userSchemas

@Injectable()
export class UserPayloadPipe implements PipeTransform {
  private schemaMap: UserSchemaType = userSchemas

  constructor(private schemaType: keyof UserSchemaType = 'user') {}

  public transform(value: UserPayload) {
    try {
      const selectedSchema = this.schemaMap[this.schemaType]
      selectedSchema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues)
      }
    }

    return value
  }
}
