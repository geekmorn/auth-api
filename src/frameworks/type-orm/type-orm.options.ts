import { DataSource, DataSourceOptions } from 'typeorm'
import { Token, User } from './entities'
import { env } from '../../../env'

export const allEntities = [User, Token]

export const typeOrmOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DATA_SOURCE_HOST,
  port: env.DATA_SOURCE_PORT,
  username: env.DATA_SOURCE_USER,
  password: env.DATA_SOURCE_PASSWORD,
  database: env.DATA_SOURCE_NAME,
  synchronize: true,
  entities: allEntities,
  migrations: ['src/frameworks/type-orm/migrations/**/*.ts'],
}

export default new DataSource(typeOrmOptions)
