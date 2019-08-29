import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/modules/users.module';
import 'dotenv/config';
import { ConfigModule } from './config/config.module';
import { DatabaseService } from './common/database/database.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthenticationModule } from './app/authentications/modules/authentication.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useClass: DatabaseService,
      inject: [DatabaseModule],
    }),
    UsersModule,
    AuthenticationModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  // constructor(
  //   // private readonly connection: Connection,
  // //   // private readonly databaseConfig: DatabaseService,
  //   private readonly abc: string,
  // ) {}
}
