import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenSignUp } from './authen-sign-up';
import { UserUseCasesModule } from 'use-cases/user';
import { AuthenSignIn } from './authen-sign-in';
import { AuthenRefresh } from './authen-refresh';
import { AuthenUseCasesModule } from 'use-cases/authen';
import { ValidatorModule } from 'services/validation';
import { JwtModule } from 'services/jwt';
import { AuthenticationMiddleware } from 'middleware/authentication';
import { RequestService } from 'services/request';
import { HttpService } from 'services/http';

@Module({
  imports: [
    UserUseCasesModule,
    AuthenUseCasesModule,
    ValidatorModule,
    JwtModule,
  ],
  providers: [RequestService, HttpService],
  controllers: [AuthenSignUp, AuthenSignIn, AuthenRefresh],
})
export class AuthenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/authen/refresh');
  }
}
