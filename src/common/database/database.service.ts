import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

  constructor(private readonly config: ConfigService) {
    // console.log(`${__dirname}/../../`);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user_admin',
      password: 'user_admin',
      database: this.config.getDatabase(),
      // entities: [__dirname + '../../app/users/*.entity{.ts,.js}'],
      // entities: [ __dirname + '/../../../dist/app/users/user.entity.js'],
      entities: [ __dirname + '/../../../dist/app/**/*.entity{.ts,.js}'],
      // entities: [
      //   UserEntity,
      // ],
      synchronize: true,
    };
  }
}
