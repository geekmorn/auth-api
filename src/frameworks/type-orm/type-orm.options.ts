import { DataSource, DataSourceOptions } from 'typeorm';
import { Item, User } from './entities';

export const allEntities = [Item, User];

export const typeOrmOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'root',
  database: 'docker',
  synchronize: true,
  entities: allEntities,
  migrations: ['src/frameworks/type-orm/migrations/**/*.ts'],
};

export default new DataSource(typeOrmOptions);
