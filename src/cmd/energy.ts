import command from '../commands';
import { checkBody, checkAge } from '../system/middlewares';
import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';

export default class Energy extends command {

  constructor() {
    super(['energy'], '', false, [checkBody, checkAge])
  }

  command(client: Client, msg: any, player: SnkPlayer): void {
    const embed = new MessageEmbed()
      .setColor('#19fa65')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Tu Energía')
      .setDescription(`Actualmente posees una energía de \`${player.getEnergy()}\`.`)
      .setTimestamp();
    msg.channel.send(embed);
  }
}
