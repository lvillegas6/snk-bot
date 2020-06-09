import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';
import command from '../commands';

export default class Health extends command {

  constructor() {
    super(['health'], '', false)
  }

  call(client: Client, msg: any): void {

    let player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

    if (!player.hasBody()) {

      database.getPlayerManager(msg.guild.id).getPlayers();
      SnkDefaults.sendNotSoulMessage(msg);
      return;

    }

    let embed = new MessageEmbed()
      .setColor('#f75e2f')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Tu Salud')
      .setDescription("Actualmente posees una salud de `" + player.getHealth() + "`.")
      .setTimestamp();

    msg.channel.send(embed);

  }

}
