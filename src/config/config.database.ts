import { getBoolean } from '../common/utilities';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const defaultOptions: TypeOrmModuleOptions = {
  // @ts-ignore
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: getBoolean(process.env.TYPEORM_SYNCHRONIZE),
};