import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { UserEntity } from '../../app/users/user.entity';
import { DatabaseType } from 'typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

  constructor(private readonly config: ConfigService) {
    console.log(`${__dirname}/../../../dist/app/users/user.entity.js`);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    // @ts-ignore
    return {
      name: this.config.getDatabaseName(),
      type: this.config.getDatabaseType() as DatabaseType,
      host: this.config.getDatabaseHost(),
      port: this.config.getDatabasePort(),
      username: this.config.getDatabaseUser(),
      password: this.config.getDatabasePassword(),
      database: this.config.getDatabaseName(),
      entities: [__dirname + '/../../app/*/*.entity.ts'],
      synchronize: true,
      logging: false,
    };
  }
}
