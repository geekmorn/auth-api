export enum ValidatorStrategyType {
  authorizationHeader,
  authorizationCookie,
}

export type ValidatorStrategies = Record<string, ValidatorStrategy>;

export abstract class ValidatorStrategy {
  abstract validate(optivalue: string): Promise<string>;
}
