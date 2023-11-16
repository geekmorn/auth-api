import { UnauthorizedException } from '@nestjs/common';
import {
  ValidatorName,
  ValidatorStrategy,
} from 'core/services/validator-service.abstract';

export class RefreshCookieStrategy implements ValidatorStrategy {
  name: ValidatorName = 'refreshCookie';

  public async validate(value: string): Promise<string> {
    if (!value || value === '') {
      throw new UnauthorizedException('Authorization refresh key not provided');
    }

    return value;
  }
}
