
import { readdir } from 'fs'
import { Client } from 'discord.js';

const commands: command[] = []
export const getCommands = () => commands;

export function setup() {

    readdir(__dirname + '/cmd/', (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach(element => {
            const command = require(__dirname + '/cmd/' + element).default;
            commands.push(new command())
        });

    })
}

export default abstract class command {

    private aliases: string[];
    private tooltip: string;
    private admin: boolean;

    constructor(alias: string[], tooltip: string, admin: boolean) {
        this.aliases = alias || [];
        this.tooltip = tooltip || '';
        this.admin = admin || false;
    }

    getAliases = () => this.aliases;
    getTooltip = () => this.tooltip;
    getAdmin = () => this.admin;

    abstract call(client: Client, msg: any): void;
}
