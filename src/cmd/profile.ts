import command from '../commands'
import { Client, MessageEmbed } from 'discord.js';
import { SnkNames } from '../util/snknames';

export default class Memories extends command {

    constructor() {
        super(['profile'], '', false)
    }

    call(client: Client, msg: any): void {

        const memories = '`2000`'
        const character = new SnkNames().randomCharacter(200, 5);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Perfil')
            .addFields(
                { name: '⚔ Personaje', value: character['name'], inline: true },
                { name: '📔 Recuerdos', value: memories, inline: true }
            )

        msg.channel.send(embed);
        
    }

}
