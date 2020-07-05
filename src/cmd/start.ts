import command from '../commands';
import { SnkNames } from '../util/snknames';
import { SnkPlayer, SnkGuild } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';
import { database } from '../main';
import { hasSould } from '../system/middlewares';

export default class Start extends command {

  constructor() {
    super(['start'], '', false, [hasSould])
  }

  command(client: Client, msg: any, player: SnkPlayer) {

    let embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTimestamp();

    const guild: SnkGuild = database.getSoftGuild(msg.guild.id);

    const character = new SnkNames().randomCharacter(200, 5); // Elije un personaje
    const deathdate = new Date().getTime() + (1000 * 60 * 60 * 12 * (character['age'] - 12));

    player.setAttribute('body', true);
    player.setAttribute('character', character);
    player.setAttribute('borndate', new Date().getTime())
    player.setAttribute('deathdate', deathdate);

    embed = new MessageEmbed() // Mensaje con el nuevo personaje
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#34eb64')
      .setTitle('👶 Un sol reluciente nos acompaña, ¡Has nacido!')
      .setDescription(
        [
          `Tu nombre a partir de ahora será **${character['name']}**, actualmente eres un bebé y deberás esperar 10 minutos para poder empezar a realizar acciones, ganar dinero, recuerdos y demás. Veamos quien eres esta vez:`,
          '',
          `💉 **Linaje:** ${character['name'].split(' ')[1]}`,
          '⚡ **Linaje Especial:** No', // si es especial o real su sangre
          '🧬 **ADN Titan:** No', // si reencarnó con titán
          '🏠 **Nacimiento:** Trost' // lugar de nacimiento
        ])
      .setThumbnail(character['image'])
      .setFooter(`Aún estas creciendo, puedes utilizar ${guild.getPrefix()}adoptenme para probar suerte!`, 'https://i.imgur.com/3iOov1I.png');

    msg.channel.send(embed);

  }
}
