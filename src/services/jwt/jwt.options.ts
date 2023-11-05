export const jwtConfig = {
  access: {
    expires: '15m',
    secret: 'access secret',
  },
  refresh: {
    expires: '7d',
    secret: 'refresh secret',
  },
} as const;
