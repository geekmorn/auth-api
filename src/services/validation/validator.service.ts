import { ValidatorName, ValidatorStrategies } from './validator.options';

export class ValidatorService {
  private strategies: ValidatorStrategies = {};

  use(strategies: ValidatorStrategies) {
    this.strategies = strategies;
  }

  async validate(validatorName: ValidatorName, value: string) {
    if (!this.strategies[validatorName]) {
      throw new TypeError(`Strategy ${validatorName} is not provided`);
    }

    const validator = this.strategies[validatorName];
    return await validator.validate(value);
  }
}
