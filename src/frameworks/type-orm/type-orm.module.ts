import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions, allEntities } from './type-orm.options';
import { IUserRepository, ITokenRepository } from 'core/repositories';
import { UserRepository, TokenRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature(allEntities),
    TypeOrmModule.forRoot(typeOrmOptions),
  ],
  providers: [
    {
      provide: ITokenRepository,
      useClass: TokenRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [ITokenRepository, IUserRepository],
})
export class TypeOrmDataSourceModule {}
