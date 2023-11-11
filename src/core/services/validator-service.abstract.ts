export type ValidatorName = 'accessHeader' | 'refreshCookie';

export type ValidatorStrategies = Partial<
  Record<ValidatorName, ValidatorStrategy>
>;

export abstract class ValidatorStrategy {
  abstract name: ValidatorName;
  abstract validate(value: string): Promise<string>;
}
