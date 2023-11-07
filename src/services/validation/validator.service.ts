import {
  ValidatorName,
  ValidatorStrategies,
} from 'core/services/validator-service.abstract';

export class ValidatorService {
  private strategies: ValidatorStrategies;

  // TODO attachStrategies([NameStrategy, OtherNameStrategy])
  attachStrategies(strategies: ValidatorStrategies) {
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
