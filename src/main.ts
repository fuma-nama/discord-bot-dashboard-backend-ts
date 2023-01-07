import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    maxAge: 40,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
  });
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
