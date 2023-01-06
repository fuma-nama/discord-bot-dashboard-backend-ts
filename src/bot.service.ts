import { OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

@Injectable()
export class BotService extends Client implements OnModuleInit {
  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });

    this.on('ready', () => {
      if (this.user != null) {
        Logger.log(`Logged in as ${this.user.tag}!`);
      }
    });
  }

  async onModuleInit() {
    const token = process.env['BOT_TOKEN'] as string;

    await this.login(token);
  }
}
