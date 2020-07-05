import command from '../commands';
import { SnkPlayer } from '../system/database';
import { SnkDefaults } from '../system/defaults';
import { Client } from 'discord.js';
import { database } from '../main';
import { checkBody, checkAge } from '../system/middlewares';

export default class Suicide extends command {

  constructor() {
    super(['suicide'], '', false)
  }
  setup() {
    this.addMiddlewares([checkBody(), checkAge()])
  }
  command(client: Client, msg: any, player: SnkPlayer): void {
    SnkDefaults.killPlayer(player, msg.author, database.getSoftGuild(msg.guild.id), 'Suicidio', msg.channel);
  }

}
