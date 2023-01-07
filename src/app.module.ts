import { BotService } from '@services/bot.service';
import { PrismaService } from '@services/prisma.service';
import { AppService } from '@services/app.service';

import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, BotService],
})
export class AppModule {}
