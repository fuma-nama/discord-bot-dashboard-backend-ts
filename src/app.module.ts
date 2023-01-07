import { BotService } from '@services/bot.service';
import { PrismaService } from '@services/prisma.service';
import { AppService } from '@services/app.service';

import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { GuildController } from './controllers/guild.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, GuildController],
  providers: [AppService, PrismaService, BotService],
})
export class AppModule {}
