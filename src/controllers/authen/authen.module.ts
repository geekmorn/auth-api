import { Module } from '@nestjs/common';
import { AuthenSignUp } from './authen.sign-up';
import { JwtModule } from 'services/jwt';
import { UserUseCasesModule } from 'use-cases/user';
import { TokenUseCasesModule } from 'use-cases/token';
import { AuthenSignIn } from './authen.sign-in';

@Module({
  imports: [JwtModule, UserUseCasesModule, TokenUseCasesModule],
  controllers: [AuthenSignUp, AuthenSignIn],
})
export class AuthenModule {}
