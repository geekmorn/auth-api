import {
  ValidatorStrategyType,
  ValidatorStrategies,
} from './validator.options';

export class ValidatorService {
  private strategies: ValidatorStrategies;

  constructor(strategies: ValidatorStrategies) {
    this.strategies = strategies;
  }

  async validate(validatorType: ValidatorStrategyType, value: string) {
    if (!this.strategies[validatorType]) {
      throw new TypeError('This strategy is not provided');
    }

    const validator = this.strategies[validatorType];
    return await validator.validate(value);
  }
}
