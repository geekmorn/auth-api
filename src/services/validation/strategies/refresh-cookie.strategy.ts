import { UnauthorizedException } from '@nestjs/common';
import { ValidatorStrategy } from 'core/services/validator-service.abstract';

export class RefreshCookieStrategy implements ValidatorStrategy {
  async validate(value: string): Promise<string> {
    if (!value || value === '') {
      throw new UnauthorizedException('Authorization refresh key not provided');
    }

    return value;
  }
}
