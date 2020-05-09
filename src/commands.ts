import { readdir } from 'fs'
import { Client } from 'discord.js';

let commands: command[] = []
export const getCommands = () => commands;

export function setup(){

    readdir(__dirname + '/cmd/', (err, files) => {
        if(err) {
            console.error(err);
            return;
        }

        for (let i = 0; i < files.length; i++) {
            let command = require(__dirname + "/cmd/" + files[i]).default;
            commands.push(new command())
        }
    })
}

export default class command {
    aliases: string[];
    tooltip: string;
    admin: boolean;

    constructor(){
        this.aliases = ['']
        this.tooltip = ''
        this.admin = false
    }

    async call(client: Client, msg: any) { }

}