export enum ValidatorName {
  accessHeader = 'accessHeader',
  refreshCookie = 'refreshHeader',
}

// TODO type
// export type ValidatorName = 'accessHeader' | 'refreshHeader' Partial<>

export type ValidatorStrategies = Record<string, ValidatorStrategy>;

export abstract class ValidatorStrategy {
  abstract validate(value: string): Promise<string>;
}
