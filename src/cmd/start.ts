import { Client } from 'discord.js';
import command from '../commands';

export default class Start extends command {

    constructor(){
        super()
        this.tooltip = ''
        this.aliases = ['start']
        this.admin = false
    }
    
    async call(client: Client, msg: any) {
        msg.reply('starting')
    }

}