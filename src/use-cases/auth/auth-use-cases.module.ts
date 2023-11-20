import { Module } from '@nestjs/common'
import { DataSourceModule } from 'services/data-source'
import { AuthUseCases } from './auth.use-cases'
import { JwtModule } from 'services/jwt'
import { HttpService } from 'services/http'

@Module({
  imports: [DataSourceModule, JwtModule],
  providers: [AuthUseCases, HttpService],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
