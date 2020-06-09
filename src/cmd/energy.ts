import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';

import command from '../commands';

export default class Energy extends command {

  constructor() {
    super(['energy'], '', false)
  }

  call(client: Client, msg: any): void {

    const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

    if (!player.hasBody()) {

      database.getPlayerManager(msg.guild.id).getPlayers();
      SnkDefaults.sendNotSoulMessage(msg);
      return;

    }

    const embed = new MessageEmbed()
      .setColor('#19fa68')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Tu Energía')
      .setDescription(`Actualmente posees una energía de \`${player.getEnergy()}\`.`)
      .setTimestamp();

    msg.channel.send(embed);

  }

}
