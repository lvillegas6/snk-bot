import command from '../commands';
import { checkBody, checkAge } from '../system/middlewares';
import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';

export default class Money extends command {

  constructor() {
    super(['money'], '', false, [checkBody, checkAge])
  }

  command(client: Client, msg: any, player: SnkPlayer): void {
    const embed = new MessageEmbed()
      .setColor('#19fa68')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Tu Dinero')
      .setDescription(`Actualmente tienes \`$${player.getMoney()}\`.`)
      .setTimestamp();
    msg.channel.send(embed);
  }
}
