import { Module } from '@nestjs/common';
import { UserUseCasesModule } from 'use-cases/user/user.use-cases.module';
import { UsersFetch } from './users.fetch';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UsersFetch],
})
export class UsersModule {}
