import { Module } from '@nestjs/common';
import { UserUseCaseModule } from 'use-cases/user/user.use-case.module';
import { UsersFetch } from './users.fetch';
import { UsersCreate } from './users.create';
import { JwtModule } from 'services/jwt';

@Module({
  imports: [UserUseCaseModule, JwtModule],
  controllers: [UsersFetch, UsersCreate],
})
export class UsersModule {}
