import { UnauthorizedException } from '@nestjs/common';

export function validateAuthorizationHeader(authorizationHeader: string) {
  try {
    const [type, token] = authorizationHeader.split(' ');
    if (type.toLowerCase() !== 'bearer') {
      throw new Error('Authorization type is incorrect');
    }
    return token;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new UnauthorizedException('Authorization key not provided');
    }
    if (error instanceof Error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
