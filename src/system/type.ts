import { Client } from 'discord.js'
import { SnkPlayer } from './database'

export function Middleware(handle: (client: Client, msg: any, player: SnkPlayer, middleware: any) => void) {
  return function (next: any) {
    return function (client: Client, msg: any, player: SnkPlayer): void {
      handle(client, msg, player, next)
    }
  }
}
