import {
  ValidatorName,
  ValidatorStrategies,
  ValidatorStrategy,
} from 'core/services/validator-service.abstract'

export class ValidatorService {
  private strategies: ValidatorStrategies = {}

  public attachStrategies(strategyArray: ValidatorStrategy[]) {
    strategyArray.forEach((strategy) => {
      const strategyName = strategy.name
      this.strategies[strategyName] = strategy
    })
  }

  public async validate(validatorName: ValidatorName, value: string | null) {
    if (!this.strategies[validatorName]) {
      throw new TypeError(`Strategy ${validatorName} is not provided`)
    }

    const validator = this.strategies[validatorName]
    //@ts-expect-error cheked before
    return await validator.validate(value)
  }
}
