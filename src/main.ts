require('dotenv').config();
import './polyfill';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { WEB_URL } from '@config/discord';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    maxAge: 40,
    origin: WEB_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
  });
  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();
