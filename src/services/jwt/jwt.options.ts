import { env } from 'utils/env';

export const jwtConfig = {
  access: {
    expires: env.JWT_ACCESS_EXPIRE,
    secret: env.JWT_ACCESS_SECRET,
  },
  refresh: {
    expires: env.JWT_REFRESH_EXPIRE,
    secret: env.JWT_REFRESH_SECRET,
  },
} as const;
