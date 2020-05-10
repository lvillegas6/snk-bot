import { Client } from 'discord.js'
import { setup, getCommands } from './commands'
import config from '../config.json'

const client: Client = new Client()
const prefix = '!'

client.on('ready', () => {
    console.log('Ready');
    setup();
})

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        const cmd = msg.content.substring(1)

        for (const item of getCommands()) {
            if (item.getAliases().includes(cmd)) {
                item.call(client, msg)
            }
        }
    }
});

client.login(config['token'])

