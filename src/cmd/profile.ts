import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client, MessageEmbed } from 'discord.js';
import { database } from '../main';
import command from '../commands'

export default class Memories extends command {

  constructor() {
    super(['profile'], '', false)
  }

  call(client: Client, msg: any): void {

    const mention = msg.mentions.users.first();
    const player: SnkPlayer = database.getSoftPlayer(mention ? mention.id : msg.author.id, msg.guild.id);

    if (!player.hasBody()) {

      database.getPlayerManager(msg.guild.id).getPlayers()
      SnkDefaults.sendNotSoulMessage(msg, mention)
      return;

    }

    const age = player.getAttribute('age')

    if (age < 12) {

      SnkDefaults.sendInsufficientAge(msg, age, mention)
      return

    }

    const [momey, memories, respects, health, energy, character] = player
      .getAttributes(['money', 'memories', 'respects', 'health', 'energy', 'character'])

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
      ])
      .setThumbnail(character.image)
    msg.channel.send(embed)

  }

}
