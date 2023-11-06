import { Module } from '@nestjs/common';
import { DataSourceModule } from 'services/data-source';
import { AuthenUseCases } from './authen.use-cases';
import { JwtModule } from 'services/jwt';
import { ValidatorModule } from 'services/validation';
import { HttpService } from 'services/http';

@Module({
  imports: [DataSourceModule, JwtModule, ValidatorModule],
  providers: [AuthenUseCases, HttpService],
  exports: [AuthenUseCases],
})
export class AuthenUseCasesModule {}
