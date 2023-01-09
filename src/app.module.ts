import { GuildService } from './services/guild.service';
import { BotService } from '@services/bot.service';
import { PrismaService } from '@services/prisma.service';
import { DiscordService } from '@services/discord.service';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { GuildController } from './controllers/guild.controller';
import { AuthMiddleware } from '@middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController, AuthController, GuildController],
  providers: [DiscordService, PrismaService, BotService, GuildService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('guilds');
  }
}
