export abstract class IValidationFactory {
  abstract validateAuthorizationHeader(token: string): string | void;
}
