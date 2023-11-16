export type JwtType = 'access' | 'refresh';
export type AccessToken = { access: string };
export type RefreshToken = { refresh: string };

export type JwtToken = {
  type: JwtType;
  sub: string;
};

export abstract class IJwtService {
  abstract getTokens(sub: string): Promise<AccessToken & RefreshToken>;
  abstract generateJwt(sub: string, type: JwtType): Promise<string>;
  abstract verify(token: string, type: JwtType): Promise<string>;
}
