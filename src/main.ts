import { Client, DiscordAPIError } from 'discord.js'
import { SnkDatabase } from './system/database'

import { setupCommands, getCommands } from './commands'
import { setupJobs } from './jobs'

import config from '../config.json'

const client: Client = new Client()
const prefix = '!'

export let database: SnkDatabase; // base de datos

client.on('ready', () => {
    console.log('Ready');
    database = new SnkDatabase(() => { // se inicializa la base de datos
        console.log('Registering guilds...')
        client.guilds.cache.forEach(guild => {
            database.registerGuild(guild.id);
        });
        setupCommands(); // Solo inicializar comandos luego de que el bot está en ready y la db inicializó
        setupJobs();
    });
});

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

