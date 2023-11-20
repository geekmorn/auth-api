import { envSchema } from './env.schema'

const validateEnvironmentVariables = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('Invalid environment variables:', error)
    process.exit(1)
  }
}

export const env = validateEnvironmentVariables()
