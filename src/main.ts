import { Client } from 'discord.js'
import config from '../config.json';

const client: Client = new Client()

client.on('ready', () => {
    console.log(`Ready`);
})

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
});

client.login(config["token"])

