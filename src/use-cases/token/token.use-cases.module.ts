import { Module } from '@nestjs/common';
import { DataSourceModule } from 'services/data-source';
import { TokenUseCases } from './token.use-cases';

@Module({
  imports: [DataSourceModule],
  providers: [TokenUseCases],
  exports: [TokenUseCases],
})
export class TokenUseCasesModule {}
