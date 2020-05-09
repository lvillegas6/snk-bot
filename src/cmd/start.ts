import { SnkNames } from '../util/snknames';
import { Client } from 'discord.js';

import Discord from 'discord.js'
import command from '../commands';

export default class Start extends command {

    constructor(){
        super()
        this.tooltip = ''
        this.aliases = ['start']
        this.admin = false
    }
    
    async call(client: Client, msg: any) {

        let character = new SnkNames().randomCharacter(200, 5);
        let embed = new Discord.MessageEmbed()
            .setColor('#34eb64')
            .setTitle('¡Has nacido!')
            .setDescription('Tu nombre a partir de ahora será **' + character['name'] + "**.\ntestline2")
            .setThumbnail(character['image'])
            .setTimestamp()
            .setFooter('Crecerás en 10 minutos', character['image']);

        msg.channel.send(embed);

    }

}