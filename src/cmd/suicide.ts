import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';

import command from '../commands';

export default class Suicide extends command {

  constructor() {
    super(['suicide'], '', false)
  }

  call(client: Client, msg: any): void {

    const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

    if (!player.hasBody()) {

      SnkDefaults.sendNotSoulMessage(msg);
      return;

    }

    SnkDefaults.killPlayer(player, msg.author, database.getSoftGuild(msg.guild.id), 'Suicidio', msg.channel);

  }

}
