import { z } from 'zod'

const UUID_Regex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

export const userPayloadSchema = z.object({
  id: z.string().regex(UUID_Regex, 'ID field must be in type UUID'),
  password: z.string().min(4),
})

export const userIdSchema = userPayloadSchema.omit({ password: true })
