import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { UserEntity } from './app/users/user.entity';
import { Connection } from 'typeorm';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'user_admin',
  password: 'user_admin',
  database: 'user_service',
  synchronize: true,
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
