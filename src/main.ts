import { Client } from 'discord.js'

const config = require('../config.json')

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

