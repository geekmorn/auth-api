import { Module } from '@nestjs/common'
import { TypeOrmDataSourceModule } from 'frameworks/type-orm'

@Module({
  imports: [TypeOrmDataSourceModule],
  exports: [TypeOrmDataSourceModule],
})
export class DataSourceModule {}
