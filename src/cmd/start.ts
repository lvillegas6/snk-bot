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

        let embed;
        const player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);//Ve si existe el jugador, sino lo crea
        if (player.getAttribute('body') === false) {//Si el jugador no tiene un cuerpo se lo crea

            const character = new SnkNames().randomCharacter(200, 5);//Elije un personaje

            player.setAttribute('body', true);
            player.setAttribute('character', character);

            embed = new MessageEmbed()//Mensaje con el nuevo personaje
                .setColor('#34eb64')
                .setTitle('¡Has nacido!')
                .setDescription('Tu nombre a partir de ahora será **' + character['name'] + '**.')
                .setThumbnail(character['image'])
                .setTimestamp()
                .setFooter('Crecerás en 10 minutos', character['image']);

        } else if (player.getAttribute('body') === true) {
            embed = new MessageEmbed()
                .setColor('#ed1f22')
                .setTitle('¡Ya posees un personaje!')
                .setTimestamp();
        }

        msg.channel.send(embed);

    }
}
