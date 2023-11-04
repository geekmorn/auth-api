import { ValidatorStrategy } from '../validator.options';

export class AuthorizationCookieStrategy implements ValidatorStrategy {
  async validate(value: string): Promise<string> {
    if (!value || value === '') {
      return 'Authorization refresh key not provided';
    }

    return value;
  }
}
