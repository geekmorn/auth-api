import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthenTokensGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return true;
  }
}
