export enum ValidatorName {
  accessHeader = 'accessHeader',
  refreshCookie = 'refreshHeader',
}

export type ValidatorStrategies = Record<string, ValidatorStrategy>;

export abstract class ValidatorStrategy {
  abstract validate(value: string): Promise<string>;
}
