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

        let player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

        console.log(player.getAttribute('body'))

        if (player.getAttribute("body") === false) {

            const character = new SnkNames().randomCharacter(200, 5);

            player.setAttribute("body", true);
            player.setAttribute("character", character);

            const embed = new MessageEmbed()
                .setColor('#34eb64')
                .setTitle('¡Has nacido!')
                .setDescription('Tu nombre a partir de ahora será **' + character['name'] + '**.')
                .setThumbnail(character['image'])
                .setTimestamp()
                .setFooter('Crecerás en 10 minutos', character['image']);

            msg.channel.send(embed);
            return;

        }

        const embed = new MessageEmbed()
            .setColor('#ed1f22')
            .setTitle('¡Ya posees un personaje!')
            .setTimestamp();

        msg.channel.send(embed);



    }
}
