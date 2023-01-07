import { BotService } from '@services/bot.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';
import { WelcomeMessage } from '@prisma/client';

type Feature = 'welcome-message';

@Controller('/guilds')
export class GuildController {
  constructor(
    private readonly bot: BotService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/:guild')
  async getGuild(@Param('guild') guild: string): Promise<any> {
    const data = this.bot.guilds.cache.get(guild);
    if (data == null) return 'null';

    return {
      id: data.id,
      name: data.name,
      icon: data.icon,
      enabledFeatures: await this.getEnabledFeatures(guild),
    };
  }

  @Get('/:guild/features/welcome-message')
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

  @Post('/:guild/features/welcome-message')
  async enableFeature(@Param('guild') guild: string) {
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

  @Patch('/:guild/features/welcome-message')
  async updateFeature(
    @Param('guild') guild: string,
    @Body() body: Partial<WelcomeMessage>,
  ) {
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

  @Delete('/:guild/features/welcome-message')
  async disableFeature(@Param('guild') guild: string) {
    await this.prisma.welcomeMessage.delete({
      where: {
        id: guild,
      },
    });

    return 'Success';
  }

  @Get('/:guild/channels')
  async getChannels(@Param('guild') guild: string) {
    const channels = await this.bot.guilds.cache.get(guild)?.channels.fetch();
    if (channels == null) return null;

    return [...channels.values()];
  }

  @Get('/:guild/roles')
  async getRoles(@Param('guild') guild: string) {
    const roles = await this.bot.guilds.cache.get(guild)?.roles.fetch();
    if (roles == null) return null;

    return [...roles.values()];
  }

  async getEnabledFeatures(guild: string): Promise<Feature[]> {
    const features: Feature[] = [];
    const welcomeMessage = await this.prisma.welcomeMessage.count({
      where: {
        id: guild,
      },
    });

    if (welcomeMessage !== 0) {
      features.push('welcome-message');
    }

    return features;
  }
}
