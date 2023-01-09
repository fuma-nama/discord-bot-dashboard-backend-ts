import { DiscordService, AccessToken } from '@services/discord.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BotService } from './bot.service';
import { PrismaService } from './prisma.service';

type Feature = 'welcome-message';

@Injectable()
export class GuildService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bot: BotService,
    private readonly discord: DiscordService,
  ) {}

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

  async checkPermissions(user: AccessToken, guildID: string) {
    const guild = this.bot.guilds.cache.get(guildID);
    if (guild == null)
      throw new HttpException('Guild Not found', HttpStatus.NOT_FOUND);

    const userID = await this.discord.getUserID(user.access_token);
    const member = await guild?.members.fetch(userID);

    if (
      !member?.permissions.has('Administrator') &&
      guild.ownerId !== member.id
    ) {
      throw new HttpException('Missing permissions', HttpStatus.BAD_REQUEST);
    }
  }
}
