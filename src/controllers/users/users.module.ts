import { Module } from '@nestjs/common';
import { UserUseCasesModule } from 'use-cases/user/user-use-cases.module';
import { UsersFetch } from './users-fetch';
import { AuthUseCasesModule } from 'use-cases/auth';

@Module({
  imports: [UserUseCasesModule, AuthUseCasesModule],
  controllers: [UsersFetch],
})
export class UsersModule {}
