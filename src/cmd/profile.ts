import { SnkPlayer } from '../system/database';
import { Client, MessageEmbed } from 'discord.js';

import { database } from '../main';
import command from '../commands'

export default class Memories extends command {

    constructor() {
        super(['profile'], '', false)
    }

    call(client: Client, msg: any): void {

        let player: SnkPlayer = database.getSoftPlayer(msg.author.id, msg.guild.id);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Perfil')

        if (player.getAttribute("body") === false) {

            let character = player.getCharacter();

        }

        msg.channel.send(embed);

    }

}
