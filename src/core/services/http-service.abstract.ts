export type CookieName = 'refreshToken'
export type HeaderName = 'authorization' | 'x-api-key'

export abstract class IHttpService<Req, Res> {
  abstract setCookie(name: CookieName, value: string, response: Res): Promise<void>
  abstract extractCookie(name: CookieName, request: Req): Promise<string | null>
  abstract extractHeader(name: HeaderName, request: Req): Promise<string | null>
}
