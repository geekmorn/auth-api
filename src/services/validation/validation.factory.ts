import { IValidationFactory } from 'core/services/validation.factory.abstract';
import { validateAuthorizationHeader } from './validation.authorization-header';

export class ValidationFactory implements IValidationFactory {
  validateAuthorizationHeader(authorizationHeader: string): string | void {
    return validateAuthorizationHeader(authorizationHeader);
  }
}
