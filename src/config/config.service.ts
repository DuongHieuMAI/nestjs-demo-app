import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string = '.env') {
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
        .valid(['postgres'])
        .default('postgres'),
      TYPEORM_HOST: Joi.string()
        .default('localhost'),
      TYPEORM_PORT: Joi.number()
        .default(5432),
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

  public getDatabaseName(): string {
    return this.envConfig.TYPEORM_DATABASE;
  }

  public getDatabaseUser(): string {
    return this.envConfig.TYPEORM_USERNAME;
  }

  public getDatabasePassword(): string {
    return this.envConfig.TYPEORM_PASSWORD;
  }

  public getDatabasePort(): number {
    return Number(this.envConfig.TYPEORM_PORT);
  }

  public getDatabaseHost(): string {
    return this.envConfig.TYPEORM_HOST;
  }

  public getDatabaseType(): string {
    return this.envConfig.TYPEORM_CONNECTION;
  }


  public getEnvConfig(): EnvConfig {
    return this.envConfig;
  }
}
