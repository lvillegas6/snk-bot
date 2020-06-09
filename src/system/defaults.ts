import { Client, MessageEmbed } from 'discord.js';

export default class BotDefaults {

  public killPlayer(player: any, user: any, guild: any, cause: string, channel: any) {
    console.log(player)
    if (player.hasBody()) {
      this.sendDeathMessage(player, user, guild, cause, channel);
      player.kill();
    }
  }

  public sendDeathMessage(player: any, user: any, guild: any, cause: string, channel: any) {
    console.log(player.getAttribute('body'))
    let embed = new MessageEmbed()
      .setTitle("⚰ ¡Ha muerto un jugador!")
      .setDescription([
        `**${player.getCharacter()['name']}** (\`${user.tag}\`)\n`,
        ``,
        `📜 **Causa:** ${cause}`,
        `⌛ **Edad:** ${player.getCharacter()['age']}`,
        ``,
        player.getCharacter()['official'] ? `🔹 ¡Personaje **OFICIAL** liberado!` : ``
      ])
      .setTimestamp()
      .setFooter(`Puedes utilizar ${guild.getPrefix()}start para reencarnar en otro personaje`)
      .setThumbnail('https://i.imgur.com/ALmIA2E.png')
    channel.send(embed);
  }

  public sendNotSoulMessage(msg: any) {
    msg.channel.send(new MessageEmbed()
      .setColor('#d8ecf2')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('¡Eres un alma sin cuerpo!')
      .setDescription('No puedes utilizar este comando porque actualmente eres un alma, debes reencarnar primero, para ello utiliza el comando `!start`.')
      .setTimestamp());
  }

  public sendInsufficientMoneyMessage(msg: any, required: number, current: number) {
    msg.channel.send(new MessageEmbed()
      .setColor('#ed0e0e')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('¡No tienes suficiente dinero!')
      .setDescription('Para comprar este objeto necesitas algo mas de dinero.')
      .addField('Tu Dinero', current, true)
      .addField('Necesario', required, true)
      .setTimestamp());
  }

}

export const SnkDefaults = new BotDefaults();
