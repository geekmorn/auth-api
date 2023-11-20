import { z } from 'zod'

export const envSchema = z.object({
  DATA_SOURCE_HOST: z.string(),
  DATA_SOURCE_USER: z.string(),
  DATA_SOURCE_PASSWORD: z.string(),
  DATA_SOURCE_NAME: z.string(),
  DATA_SOURCE_PORT: z.string().transform(Number),
  JWT_ACCESS_EXPIRE: z.string(),
  JWT_REFRESH_EXPIRE: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  APP_PORT: z.string().transform(Number),
})
