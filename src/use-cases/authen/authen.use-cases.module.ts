import { Module } from '@nestjs/common';
import { DataSourceModule } from 'services/data-source';
import { AuthenUseCases } from './authen.use-cases';
import { HttpModule } from 'services/http';
import { JwtModule } from 'services/jwt';

@Module({
  imports: [DataSourceModule, HttpModule, JwtModule],
  providers: [AuthenUseCases],
  exports: [AuthenUseCases],
})
export class AuthenUseCasesModule {}
