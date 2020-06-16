import { MessageEmbed } from 'discord.js';

import { client } from '../main'

export default class DiscordReactioner {

  private message: any;

  private limit: number;
  private time: number;
  private emojis: string[];
  private whitelist: string[];

  constructor(message: any, emojis: string[], whitelist?: string[], time?: number, limit?: number) {
    this.message = message;
    this.emojis = emojis;
    this.whitelist = whitelist || [];
    this.time = time || 300000;
    this.limit = limit || 1;
  }

  listen(resolve: any, none: any) {

    for (const emoji of this.emojis) {this.message.react(emoji);}

    const filter = (reaction: any, user: any) => {
      if (user.bot) {return false;}
      const bypass = this.whitelist.length === 0 ? true : this.whitelist.includes(user.id);
      return this.emojis.includes(reaction.emoji.name) && bypass;
    };

    this.message.awaitReactions(filter, { max: this.limit, time: this.time, errors: ['time'] })
      .then((collected: any) => resolve(collected))
      .catch((error: any) => console.log(error));

  }

}
