import { Client } from 'discord.js';
import { SnkPlayer } from './database';
import { SnkDefaults } from './defaults';

export function checkBody() {
  return function (middleware: any) {
    return function (client: Client, msg: any, player: SnkPlayer): void {

      if (!player.hasBody()) {
        const mention = msg.mentions.users.first();
        SnkDefaults.sendNotSoulMessage(msg, mention)
        return;
      }
      middleware(client, msg, player)

    }
  }
}

export function hasSould() {
  return function (middleware: any) {
    return function (client: Client, msg: any, player: SnkPlayer): void {

      if (player.hasBody()) {
        SnkDefaults.sendHasSoulMessage(msg)
        return;
      }
      middleware(client, msg, player)

    }
  }
}

export function checkAge() {
  return function (middleware: any) {
    return function (client: Client, msg: any, player: SnkPlayer): void {

      const age = player.getAttribute('age')
      if (age < 12) {
        const mention = msg.mentions.users.first();
        SnkDefaults.sendInsufficientAge(msg, player.getAge(), mention)
        return
      }
      middleware(client, msg, player)

    }
  }
}
