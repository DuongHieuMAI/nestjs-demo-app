import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AnyExceptionFilter } from './core/exceptions/http-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

const port = process.env.PORT || 3000;
// const appConfig = new ConfigService();
// port = this.c.get('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User Service example')
    .setDescription('The news API description')
    .setVersion('1.0')
    .addTag('users')
    .setBasePath('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/document', app, document);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // var configPort = 3000;
  let configPort = app.get('ConfigService').port();

  await app.listen(configPort);
  Logger.log(`Server running on port: ${configPort}`, 'Boostrap');
}
bootstrap();
