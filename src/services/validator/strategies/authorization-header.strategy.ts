import { ValidatorStrategy } from '../validator.options';

const tokenNotProvided = 'Authorization access key not provided';
const tokenTypeError = 'Authorization access type is incorrect';

export class AuthorizationHeaderStrategy implements ValidatorStrategy {
  async validate(value: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        const [type, token] = value.split(' ');
        if (!token) {
          resolve(tokenNotProvided);
        }
        if (type.toLocaleLowerCase() !== 'bearer') {
          resolve(tokenTypeError);
        }
        resolve(token);
      } catch (error) {
        if (error instanceof TypeError) {
          resolve(tokenNotProvided);
        }
      }
    });
  }
}
