import { Module } from '@nestjs/common';
import { UserUseCasesModule } from 'use-cases/user/user-use-cases.module';
import { UsersFetch } from './users-fetch';
import { AuthenUseCasesModule } from 'use-cases/authen';

@Module({
  imports: [UserUseCasesModule, AuthenUseCasesModule],
  controllers: [UsersFetch],
})
export class UsersModule {}
