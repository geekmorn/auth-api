import { UnauthorizedException } from '@nestjs/common';
import { ValidatorStrategy } from 'core/services/validator-service.abstract';

export class AccessHeaderStrategy implements ValidatorStrategy {
  async validate(value: string): Promise<string> {
    try {
      const [type, token] = value.split(' ');
      if (type.toLocaleLowerCase() !== 'bearer') {
        throw new Error('Authorization access type is incorrect');
      }

      return token;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new UnauthorizedException(
          'Authorization access key not provided',
        );
      }
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
