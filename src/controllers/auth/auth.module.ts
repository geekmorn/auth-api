import { Module } from '@nestjs/common';
import { AuthSignUp } from './auth-sign-up';
import { UserUseCasesModule } from 'use-cases/user';
import { AuthSignIn } from './auth-sign-in';
import { AuthRefresh } from './auth-refresh';
import { AuthUseCasesModule } from 'use-cases/auth';
import { JwtModule } from 'services/jwt';
import { RequestService } from 'services/request';
import { HttpService } from 'services/http';

@Module({
  imports: [UserUseCasesModule, AuthUseCasesModule, JwtModule],
  providers: [RequestService, HttpService],
  controllers: [AuthSignUp, AuthSignIn, AuthRefresh],
})
export class AuthModule {}
