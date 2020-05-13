import { SnkNames } from '../util/snknames';
import { Client, MessageEmbed } from 'discord.js';
import command from '../commands';

export default class Start extends command {

    constructor() {
        super(['start'], '', false)
    }

    call(client: Client, msg: any) {

        const character = new SnkNames().randomCharacter(200, 5);
        const embed = new MessageEmbed()
            .setColor('#34eb64')
            .setTitle('¡Has nacido!')
            .setDescription('Tu nombre a partir de ahora será **' + character['name'] + '**.\ntestline2')
            .setThumbnail(character['image'])
            .setTimestamp()
            .setFooter('Crecerás en 10 minutos', character['image']);

        msg.channel.send(embed);

    }
}
