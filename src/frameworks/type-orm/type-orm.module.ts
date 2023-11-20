import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmOptions, allEntities } from './type-orm.options'
import { IUserRepository, TokenRepository } from 'core/repositories'
import { UserRepository, RefreshTokenRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature(allEntities), TypeOrmModule.forRoot(typeOrmOptions)],
  providers: [
    {
      provide: TokenRepository,
      useClass: RefreshTokenRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [TokenRepository, IUserRepository],
})
export class TypeOrmDataSourceModule {}
