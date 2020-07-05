import command from '../commands';
import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';
import { checkBody, checkAge } from '../system/middlewares';

export default class Health extends command {

  constructor() {
    super(['health'], '', false)
  }
  setup() {
    this.addMiddlewares([checkBody(), checkAge()])
  }
  command(client: Client, msg: any, player: SnkPlayer): void {
    const embed = new MessageEmbed()
      .setColor('#f75e2f')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Tu Salud')
      .setDescription(`Actualmente posees una salud de \`${player.getHealth()}\`.`)
      .setTimestamp();
    msg.channel.send(embed);
  }
}
