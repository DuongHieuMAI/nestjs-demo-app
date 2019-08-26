import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
// import { Connection } from 'typeorm';
import 'dotenv/config';
import { ConfigModule } from './config/config.module';
// import { ConfigService } from './config/config.service';
import { DatabaseService } from './common/database/database.service';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useClass: DatabaseService,
      inject: [DatabaseModule],
    }),
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
