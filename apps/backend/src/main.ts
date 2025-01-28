import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/modules/AppModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/HttpExceptionFilters';
import * as dotenv from 'dotenv';
import { NODE_PORT } from './config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Superhero API')
    .setDescription('API para gerenciar super-heróis')
    .setVersion('1.0')
    .addTag('superheroes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(NODE_PORT);
}
bootstrap();