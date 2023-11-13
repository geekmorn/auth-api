import { Injectable } from '@nestjs/common';
import {
  CookieName,
  HeaderName,
  IHttpService,
} from 'core/services/http-service.abstract';
import { Request, Response } from 'express';

@Injectable()
export class HttpService implements IHttpService<Request, Response> {
  async setCookie(
    name: CookieName,
    value: string,
    response: Response,
  ): Promise<void> {
    response.cookie(name, value);
  }

  async extractCookie(
    name: CookieName,
    request: Request,
  ): Promise<string | null> {
    const value = request.cookies[name];
    return value;
  }

  async extractHeader(
    name: HeaderName,
    request: Request,
  ): Promise<string | null> {
    const value = request.header(name);
    return value;
  }
}
