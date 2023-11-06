import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthSignUp } from './auth-sign-up';
import { UserUseCasesModule } from 'use-cases/user';
import { AuthSignIn } from './auth-sign-in';
import { AuthRefresh } from './auth-refresh';
import { AuthUseCasesModule } from 'use-cases/auth';
import { ValidatorModule } from 'services/validation';
import { JwtModule } from 'services/jwt';
import { AuthenticationMiddleware } from 'middleware/authentication';
import { RequestService } from 'services/request';
import { HttpService } from 'services/http';

@Module({
  imports: [UserUseCasesModule, AuthUseCasesModule, ValidatorModule, JwtModule],
  providers: [RequestService, HttpService],
  controllers: [AuthSignUp, AuthSignIn, AuthRefresh],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/authen/refresh');
  }
}
