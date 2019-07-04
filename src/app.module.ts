import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { UserEntity } from './app/users/user.entity';
import { Connection } from 'typeorm';
import 'dotenv/config';
import { getBoolean } from './common/utilities';
// @ts-ignore
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

@Module({
  imports: [
    UsersModule,
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      entities: [
        UserEntity,
      ],
      synchronize: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
