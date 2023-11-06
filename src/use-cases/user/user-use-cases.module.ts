import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { DataSourceModule } from 'services/data-source';

@Module({
  imports: [DataSourceModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
