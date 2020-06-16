import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';

import command from '../commands';

export default class Select extends command {

  constructor() {
    super(['select', 'elegir'], '', false)
  }

  call(client: Client, msg: any): void {

    const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

    if (!player.hasBody()) {

      SnkDefaults.sendNotSoulMessage(msg);
      return;

    }

    SnkDefaults.sendLifeSelectionMessage(player, msg.author, database.getSoftGuild(msg.guild.id), msg.channel);

  }

}
