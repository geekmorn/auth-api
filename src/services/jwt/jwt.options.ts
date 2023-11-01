export const jwtConfig = {
  access: {
    expires: '60s',
    secret: 'access secret',
  },
  refresh: {
    expires: '7d',
    secret: 'refresh secret',
  },
} as const;
