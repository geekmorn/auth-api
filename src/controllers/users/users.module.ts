import { Module } from '@nestjs/common';
import { UserUseCasesModule } from 'use-cases/user/user-use-cases.module';
import { UsersFetch } from './users-fetch';
import { AuthUseCasesModule } from 'use-cases/auth';
import { ValidatorService } from 'services/validator';
import { RequestService } from 'services/request';
import { HttpService } from 'services/http';
import { JwtModule } from 'services/jwt';

@Module({
  imports: [UserUseCasesModule, AuthUseCasesModule, JwtModule],
  providers: [ValidatorService, RequestService, HttpService],
  controllers: [UsersFetch],
})
export class UsersModule {}
