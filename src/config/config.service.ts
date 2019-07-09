import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getBoolean } from '../common/utilities';
import { boolean } from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

// export interface OrmConfig {
//   TYPEORM_CONNECTION: 'postgres';
//   TYPEORM_HOST: string;
//   TYPEORM_USERNAME: string;
//   TYPEORM_PASSWORD: string;
//   TYPEORM_DATABASE: string;
//   TYPEORM_PORT: number;
//   TYPEORM_SYNCHRONIZE: true;
//   TYPEORM_LOGGING: true;
// }

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }
  /**
   * Ensure all needed variables are set
   * And return the validated JS object
   * including the applied default values
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NEST_ENV: Joi.string()
        .valid(['dev', 'prod', 'test'])
        .default('dev'),
      PORT: Joi.number().default(5001),
      API_AUTH_ENABLE: Joi.boolean().required(),

      TYPEORM_CONNECTION: Joi.string()
        .valid(['mysql', 'postgres'])
        .default('postgres'),
      TYPEORM_HOST: Joi.string()
        .default('localhost'),
      TYPEORM_PORT: Joi.number()
        .default(5001),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_SYNCHRONIZE: Joi.boolean().default(true),
      TYPEORM_LOGGING: Joi.boolean().default(true),
    });

    const { error, value: validatedEnvConfig} = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Public funcs
   */
  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  public port() {
    return this.envConfig.PORT;
  }

  public environment() {
    return this.envConfig.NEST_ENV;
  }

  public getDatabase(): string {
    return 'user_service';
  }

  // public typeOrmConfig() {
  //   // const defaultOptions: TypeOrmModuleOptions = {
  //   //   type: this.envConfig.TYPEORM_CONNECTION,
  //   //   host: this.envConfig.TYPEORM_HOST,
  //   //   port: this.envConfig.TYPEORM_PORT,
  //   //   username: this.envConfig.TYPEORM_USERNAME,
  //   //   password: this.envConfig.TYPEORM_PASSWORD,
  //   //   database: this.envConfig.TYPEORM_DATABASE,
  //   //   synchronize: true,
  //   // };
  //   // return defaultOptions;
  //   // var typeOrmConfig = {
  //   //   type: this.envConfig.TYPEORM_CONNECTION,
  //   //   host: this.envConfig.TYPEORM_HOST,
  //   //   port: this.envConfig.TYPEORM_PORT,
  //   //   username: this.envConfig.TYPEORM_USERNAME,
  //   //   password: this.envConfig.TYPEORM_PASSWORD,
  //   //   database: this.envConfig.TYPEORM_DATABASE,
  //   //   synchronize: true,
  //   // };
  //   var typeOrmConfig: OrmConfig = {
  //     TYPEORM_PORT: 'localhost'
  //   }
  // }
  //   // typeOrmConfig.TYPEORM_HOST = 'localhost';
  //   // typeOrmConfig.TYPEORM_PORT = 5432;
  //   return typeOrmConfig;
  // // }
}
