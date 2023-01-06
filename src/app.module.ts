import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
