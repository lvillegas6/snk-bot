import command from '../commands'
import { Client, MessageEmbed } from 'discord.js';
import { SnkPlayer } from '../system/database';
import { checkBody, checkAge } from '../system/middlewares';

export default class Memories extends command {

  constructor() {
    super(['memories'], '', false)
  }

  setup() {
    this.addMiddlewares([checkBody(), checkAge()])
  }
  command(client: Client, msg: any, player: SnkPlayer): void {

    let embed: MessageEmbed

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
