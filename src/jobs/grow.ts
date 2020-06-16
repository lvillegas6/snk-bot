import { SnkDefaults } from '../system/defaults';

import { Client, MessageEmbed } from 'discord.js';
import { database } from '../main';

import SnkJob from '../jobs';

export default class GrowJob extends SnkJob {

  constructor() {
    super(10);
  }

  run() {
    for (const manager of database.getPlayerManagers()) {
      for (const player of manager.getPlayers()) {
        if (player.hasBody() && !player.isAdult() && new Date().getTime() >= (player.getAttribute('borndate') + 10000)) { // 600000 son 10 minutos en milisegundos
          const guild = database.getSoftGuild(manager.getGuild());
          const user = player.getDiscordUser(guild);
          guild.getCommandChannel((channel: any) => {
            SnkDefaults.growPlayer(player, user, guild, channel);
          });
        }
      }
    }
  }
}
