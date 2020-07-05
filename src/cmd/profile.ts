import command from '../commands'
import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';
import { database } from '../main';
import { checkBody, checkAge } from '../system/middlewares';

export default class Memories extends command {

  constructor() {
    super(['profile'], '', false)
  }

  setup() {
    this.addMiddlewares([checkBody, checkAge])
  }

  command(client: Client, msg: any): void {

    const mention = msg.mentions.users.first();
    const player: SnkPlayer = database.getSoftPlayer(mention ? mention.id : msg.author.id, msg.guild.id);
    const [momey, memories, respects, health, energy, character, age] = player
      .getAttributes(['money', 'memories', 'respects', 'health', 'energy', 'character', 'age'])

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#0099ff')
      .setTitle(mention ? `Perfil de ${mention.username}` : 'Tu Perfil')
      .setDescription([
        `${character.name} \n`,
        '',
        `**💰 Dinero total:** ${momey}`,
        `**📔 Recuerdos:** ${memories}`,
        `**🔥 Respetos:** ${respects}`,
        `**❤ Salud:** ${health}`,
        `**⚡ Energia:** ${energy}`,
        `**⌛ Edad:** ${age}`,
      ])
      .setThumbnail(character.image)
    msg.channel.send(embed)

  }

}
