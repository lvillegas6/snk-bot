import { SnkNames } from '../util/snknames';
import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';
import command from '../commands';

export default class Start extends command {

  constructor() {
    super(['start'], '', false)
  }

  async call(client: Client, msg: any) {

    let embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTimestamp();

    const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id); // Ve si existe el jugador, sino lo crea

    if (!player.hasBody()) { // Si el jugador no tiene un cuerpo se lo crea

      const character = new SnkNames().randomCharacter(200, 5); // Elije un personaje
      const deathdate = new Date().getTime() + (1000 * 60 * 60 * 12 * (character['age'] - 12));

      player.setAttribute('body', true);
      player.setAttribute('character', character);
      player.setAttribute('borndate', new Date().getTime())
      player.setAttribute('deathdate', deathdate);

      embed = new MessageEmbed() // Mensaje con el nuevo personaje
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setColor('#34eb64')
        .setTitle('¡Has nacido!')
        .setDescription('Tu nombre a partir de ahora será **' + character['name'] + '**.')
        .setThumbnail(character['image'])
        .setFooter('Crecerás en 10 minutos', character['image']);

    } else {

      embed = new MessageEmbed()
        .setColor('#ed1f22')
        .setTitle('¡Ya posees un personaje!')
        .setDescription('Ya has reencarnado en un personaje, puedes utilizar `!profile` para ver a tu personaje actual.');

    }

    msg.channel.send(embed);

  }
}
