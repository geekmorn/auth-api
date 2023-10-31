import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions, allEntities } from './type-orm.options';
import { IUserRepository, IItemRepository } from 'core/repositories';
import { UserRepository, ItemRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature(allEntities),
    TypeOrmModule.forRoot(typeOrmOptions),
  ],
  providers: [
    {
      provide: IItemRepository,
      useClass: ItemRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IItemRepository, IUserRepository],
})
export class TypeOrmDataSourceModule {}
