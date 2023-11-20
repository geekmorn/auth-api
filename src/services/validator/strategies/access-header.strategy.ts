import { ValidatorName, ValidatorStrategy } from 'core/services/validator-service.abstract'

export class AccessHeaderStrategy implements ValidatorStrategy {
  name: ValidatorName = 'accessHeader'

  public async validate(value: string): Promise<Record<string, string>> {
    try {
      const [type, token] = value.split(' ')
      if (type.toLocaleLowerCase() !== 'bearer') {
        throw new Error()
      }

      return { validatedAccess: token }
    } catch (error) {
      if (error instanceof TypeError) {
        return { accessError: 'Authorization access key not provided' }
      } else return { accessError: 'Authorization access type is incorrect' }
    }
  }
}
