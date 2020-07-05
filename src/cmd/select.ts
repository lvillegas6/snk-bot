import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';

import command from '../commands';
import { checkBody } from '../system/middlewares';

export default class Select extends command {

  constructor() {
    super(['select', 'elegir'], '', false, [checkBody])
  }

  command(client: Client, msg: any, player: SnkPlayer): void {
    SnkDefaults.sendLifeSelectionMessage(player, msg.author, database.getSoftGuild(msg.guild.id), msg.channel);
  }
}
