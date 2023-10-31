export type JwtType = 'access' | 'refresh';
export type AccessToken = { access: string };
export type RefreshToken = { refresh: string };

export const jwtConfig = {
  expires: {
    access: '60s',
    refresh: '7d',
  },
  secret: {
    access: 'access-secret',
    refresh: 'refresh-secret',
  },
} as const;
