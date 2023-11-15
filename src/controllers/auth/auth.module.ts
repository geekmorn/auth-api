import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthSignUp } from './auth-sign-up';
import { UserUseCasesModule } from 'use-cases/user';
import { AuthSignIn } from './auth-sign-in';
import { AuthRefresh } from './auth-refresh';
import { AuthUseCasesModule } from 'use-cases/auth';
import { JwtModule } from 'services/jwt';
import { RequestService } from 'services/request';
import { HttpService } from 'services/http';
import { ValidatorService } from 'services/validator';
import { AuthenticationMiddleware } from 'middleware/authentication';

@Module({
  imports: [UserUseCasesModule, AuthUseCasesModule, JwtModule],
  providers: [RequestService, HttpService, ValidatorService],
  controllers: [AuthSignUp, AuthSignIn, AuthRefresh],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(AuthRefresh);
  }
}
