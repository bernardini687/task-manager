import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'asdf',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // autoLoadEntities: true,
  logging: ['query'],
  synchronize: true,
};
