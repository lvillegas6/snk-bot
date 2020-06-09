import { SnkDefaults } from '../system/defaults';

import { Client, MessageEmbed } from 'discord.js';
import { database } from '../main';

import SnkJob from '../jobs';

export default class KillerJob extends SnkJob {

  constructor() {
    super(10);
  }

  run() {
    for (var manager of database.getPlayerManagers())
      for (var player of manager.getPlayers()) {
        if (new Date().getTime() >= player.getAttribute('deathdate')) {
          let guild = database.getSoftGuild(manager.getGuild());
          let user = player.getDiscordUser(guild);
          guild.getCommandChannel((channel: any) => {
            SnkDefaults.killPlayer(player, user, guild, 'Muerte Natural', channel);
          });
        }
      }
  }

}