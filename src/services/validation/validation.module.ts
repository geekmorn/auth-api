import { Module } from '@nestjs/common';
import { ValidationFactory } from './validation.factory';
import { IValidationFactory } from 'core/services/validation.factory.abstract';

@Module({
  providers: [
    {
      provide: IValidationFactory,
      useClass: ValidationFactory,
    },
  ],
  exports: [IValidationFactory],
})
export class ValidationModule {}
