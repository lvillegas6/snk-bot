import { Client } from 'discord.js';
import { SnkPlayer } from './database';
import { SnkDefaults } from './defaults';
import { Middleware } from './type';

export const checkBody = Middleware(function (client: Client, msg: any, player: SnkPlayer, next: any) {
  if (!player.hasBody()) {
    const mention = msg.mentions.users.first();
    SnkDefaults.sendNotSoulMessage(msg, mention)
    return;
  }
  next(client, msg, player)
})

export const checkAge = Middleware(function (client: Client, msg: any, player: SnkPlayer, next: any) {
  const maxAge = 12
  const age = player.getAttribute('age')
  if (age < maxAge) {
    const mention = msg.mentions.users.first();
    SnkDefaults.sendInsufficientAge(msg, player.getAge(), maxAge, mention)
    return
  }
  next(client, msg, player)
})

export const hasSould = Middleware(function (client: Client, msg: any, player: SnkPlayer, next: any) {
  if (player.hasBody()) {
    SnkDefaults.sendHasSoulMessage(msg)
    return;
  }
  next(client, msg, player)
})

