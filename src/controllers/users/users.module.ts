import { Module } from '@nestjs/common';
import { UserUseCasesModule } from 'use-cases/user/user.use-cases.module';
import { UsersFetch } from './users.fetch';
import { UsersCreate } from './users.create';
import { JwtModule } from 'services/jwt';

@Module({
  imports: [UserUseCasesModule, JwtModule],
  controllers: [UsersFetch, UsersCreate],
})
export class UsersModule {}
