import { Client, MessageEmbed } from 'discord.js';

export default class BotDefaults {

  public killPlayer(player: any, user: any, guild: any, cause: string, channel: any) {
    this.sendDeathMessage(player, user, guild, cause, channel);
    player.kill();
  }

  public growPlayer(player: any, user: any, guild: any, channel: any) {
    player.grow();
    this.sendGrowMessage(player, user, guild, channel);
  }

  public sendGrowMessage(player: any, user: any, guild: any, channel: any) {
    console.log(player.getAttribute('body'))
    const embed = new MessageEmbed()
      .setColor('#fc03f0')
      .setAuthor(user.username, user.avatarURL())
      .setTitle('🧠 ¡Has crecido!')
      .setDescription([
        `**${player.getCharacter()['name']}** (${user}), porfin eres un adolescente y tienes \`${player.getAge()}\` años, ya puedes acceder a nuevos comandos!`
      ])
      .setTimestamp()
      .setFooter(`Puedes utilizar ${guild.getPrefix()}help para ver tus nuevos comandos disponibles`)
      .setThumbnail('https://i.imgur.com/G1UVSvc.png')
    channel.send(embed);
  }

  public sendDeathMessage(player: any, user: any, guild: any, cause: string, channel: any) {
    console.log(player.getAttribute('body'))
    const embed = new MessageEmbed()
      .setTitle('⚰ ¡Ha muerto un jugador!')
      .setDescription([
        `**${player.getCharacter()['name']}** (\`${user.tag}\`)\n`,
        '',
        `📜 **Causa:** ${cause}`,
        `⌛ **Edad:** ${player.getCharacter()['age']}`,
        '',
        player.getCharacter()['official'] ? '🔹 ¡Personaje **OFICIAL** liberado!' : ''
      ])
      .setTimestamp()
      .setFooter(`Puedes utilizar ${guild.getPrefix()}start para reencarnar en otro personaje`)
      .setThumbnail('https://i.imgur.com/ALmIA2E.png')
    channel.send(embed);
  }

  public sendNotSoulMessage(msg: any, mentions?: any) {
    msg.channel.send(new MessageEmbed()
      .setColor('#d8ecf2')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle(`¡${mentions ? `${mentions.username} es un` : 'Eres un'} alma sin cuerpo!`)
      .setDescription(mentions ?
        'Actualmente es un alma, debe reencarnar primero.' :
        'No puedes utilizar este comando porque actualmente eres un alma, debes reencarnar primero, para ello utiliza el comando `!start`.')
      .setTimestamp());
  }

  public sendHasSoulMessage(msg: any, mentions?: any) {
    msg.channel.send(new MessageEmbed()
      .setColor('#ed1f22')
      .setTitle('¡Ya posees un personaje!')
      .setDescription('Ya has reencarnado en un personaje, puedes utilizar `!profile` para ver a tu personaje actual.'));
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

  public sendInsufficientAge(msg: any, age: number, mentions?: any) {
    msg.channel.send(new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle(mentions ? `${mentions.username} aún es un bebé` : '¡Aún eres un bebé!')
      .setDescription(`${mentions ? 'Tiene' : 'Tienes'} \`${age}\` año(s). ${mentions ? 'Debe' : 'Debes'} crecer hasta alcanzar la edad de los 12 años.`)
      .setTimestamp());
  }

}

export const SnkDefaults = new BotDefaults();
