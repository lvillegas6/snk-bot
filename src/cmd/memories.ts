import { Client, MessageEmbed } from 'discord.js';
import { SnkPlayer } from '../system/database';

import { database } from '../main';

import command from '../commands'

export default class Memories extends command {

  constructor() {
    super(['memories'], '', false)
  }

  call(client: Client, msg: any): void {

    let embed: MessageEmbed
    const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

    if (player.getAttribute('titanmemories') === -1) {

      embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setDescription('A continuación se mostrará todos tus recuerdos: ')
        .addField('📔 Recuerdos del Alma', player.getAttribute('memories'), true)

    } else {
      embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setDescription('A continuación se mostrará todos tus recuerdos: ')
        .addFields(
          { name: '📔 Recuerdos del Alma', value: player.getAttribute('memories'), inline: true },
          { name: '📚 Recuerdos Titánicos', value: player.getAttribute('titanmemories'), inline: true },
        )

    }

    msg.channel.send(embed);
  }

}
