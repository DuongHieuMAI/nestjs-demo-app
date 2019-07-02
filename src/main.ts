import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  await app.listen(3000);
}
bootstrap();
