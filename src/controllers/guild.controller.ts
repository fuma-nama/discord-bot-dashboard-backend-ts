import { GuildService } from './../services/guild.service';
import { BotService } from '@services/bot.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { WelcomeMessage } from '@prisma/client';
import { auth, AuthRequest } from '@middlewares/auth.middleware';
import { Request } from 'express';

@Controller('/guilds/:guild')
export class GuildController {
  constructor(
    private readonly bot: BotService,
    private readonly prisma: PrismaService,
    private readonly guilds: GuildService,
  ) {}

  @Get()
  async getGuild(@Param('guild') guild: string): Promise<any> {
    const data = this.bot.guilds.cache.get(guild);
    if (data == null) return 'null';

    return {
      id: data.id,
      name: data.name,
      icon: data.icon,
      enabledFeatures: await this.guilds.getEnabledFeatures(guild),
    };
  }

  @Get('/features/welcome-message')
  async getFeature(@Param('guild') guild: string) {
    const data = await this.prisma.welcomeMessage.findUnique({
      where: {
        id: guild,
      },
    });
    if (data == null) return null;

    return {
      message: data.message,
      channel: data.channel,
    };
  }

  @Post('/features/welcome-message')
  async enableFeature(@Req() req: Request, @Param('guild') guild: string) {
    this.guilds.checkPermissions(auth(req), guild);

    await this.prisma.welcomeMessage.upsert({
      create: {
        id: guild,
      },
      update: {},
      where: {
        id: guild,
      },
    });

    return 'Success';
  }

  @Patch('/features/welcome-message')
  async updateFeature(
    @Req() req: Request,
    @Param('guild') guild: string,
    @Body() body: Partial<WelcomeMessage>,
  ) {
    this.guilds.checkPermissions(auth(req), guild);

    const updated = await this.prisma.welcomeMessage.update({
      where: {
        id: guild,
      },
      data: {
        ...body,
        id: undefined,
      },
    });

    return updated;
  }

  @Delete('/features/welcome-message')
  async disableFeature(@Param('guild') guild: string, @Req() req: AuthRequest) {
    await this.guilds.checkPermissions(req.user, guild);

    await this.prisma.welcomeMessage.delete({
      where: {
        id: guild,
      },
    });

    return 'Success';
  }

  @Get('/channels')
  async getChannels(@Param('guild') guild: string) {
    const channels = await this.bot.guilds.cache.get(guild)?.channels.fetch();
    if (channels == null) return null;

    return [...channels.values()];
  }

  @Get('/roles')
  async getRoles(@Param('guild') guild: string) {
    const roles = await this.bot.guilds.cache.get(guild)?.roles.fetch();
    if (roles == null) return null;

    return [...roles.values()];
  }
}
