import { Module } from '@nestjs/common';
import { DataSourceModule } from 'services/data-source';
import { AuthenUseCases } from './authen.use-cases';
import { HttpModule } from 'services/http';
import { JwtModule } from 'services/jwt';
import { ValidatorModule } from 'services/validation';

@Module({
  imports: [DataSourceModule, HttpModule, JwtModule, ValidatorModule],
  providers: [AuthenUseCases],
  exports: [AuthenUseCases],
})
export class AuthenUseCasesModule {}
