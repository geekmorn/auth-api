import { envSchema } from 'utils/env/env.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const validateEnvironmentVariables = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid environment variables:', error);
    process.exit(1);
  }
};

export const env = validateEnvironmentVariables();
