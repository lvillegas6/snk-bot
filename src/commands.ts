
import { readdir } from 'fs'
import { Client } from 'discord.js';
import { SnkPlayer } from './system/database';

const commands: command[] = []
export const getCommands = () => commands;

export function setupCommands() {
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
    public call: (client: Client, msg: any, player: SnkPlayer) => void;

    constructor(alias: string[], tooltip: string, admin: boolean) {
      this.aliases = alias || [];
      this.tooltip = tooltip || '';
      this.admin = admin || false;
      this.setup()
    }

    getAliases = () => this.aliases;
    getTooltip = () => this.tooltip;
    getAdmin = () => this.admin;

    abstract command(client: Client, msg: any, player: SnkPlayer): void;

    setup() {
      this.call = this.command
    }

    addMiddlewares(middlewares: Array<(middleware: any) => any>) {
      this.call = this.middleware(this.command, middlewares)
    }

    private middleware(command: (client: Client, msg: any, player: SnkPlayer) => void,
      middlewares: Array<(middleware: any) => any>) : (client: Client, msg: any, player: SnkPlayer) => void{

      if (middlewares.length < 1) {
        return command
      }

      for (let index = middlewares.length - 1; index >= 0; index--) {
        const middleware = middlewares[index]
        command = middleware(command)
      }
      return command
    }
}
