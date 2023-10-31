import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-cases';
import { DataSourceModule } from 'services/data-source';

@Module({
  imports: [DataSourceModule],
  providers: [UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCaseModule {}
