import { Module } from '@nestjs/common';
import { AuthenSignUp } from './authen.sign-up';
import { UserUseCasesModule } from 'use-cases/user';
import { AuthenSignIn } from './authen.sign-in';
import { AuthenRefresh } from './authen.refresh';
import { AuthenUseCasesModule } from 'use-cases/authen';

@Module({
  imports: [UserUseCasesModule, AuthenUseCasesModule],
  controllers: [AuthenSignUp, AuthenSignIn, AuthenRefresh],
})
export class AuthenModule {}
