import {
  CookieName,
  HeaderName,
  IHttpService,
} from 'core/services/http.service.abstract';
import { Request, Response } from 'express';

export class HttpService implements IHttpService<Request, Response> {
  setCookie(name: CookieName, value: string, response: Response): void {
    response.cookie(name, value);
  }

  extractCookie(name: CookieName, request: Request): string | undefined {
    const value = request.cookies[name];
    return value;
  }

  extractHeader(name: HeaderName, request: Request): string | undefined {
    const value = request.header(name);
    return value;
  }
}
