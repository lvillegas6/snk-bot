import DiscordReaction from '../util/reactioner';
import command from '../commands';
import { Client, MessageEmbed, MessageCollector } from 'discord.js';
import { database } from '../main';

export default class Install extends command {

  constructor() {
    super(['install'], '', false)
  }

  command(client: Client, msg: any): void {

    const guild = database.getSoftGuild(msg.guild.id);
    const initMsg = new MessageEmbed()
      .setColor('#00fff7')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle('Instalación de SNK-BOT')
      .setDescription('Por favor siga las instrucciones de manera correcta para instalar el bot en este servidor.');

    const changePrefix = new MessageEmbed()
      .setColor('#00fff7')
      .setTitle('¿Deseas cambiar el prefijo?')
      .setDescription(`> Selecciona ✅ para cambiar el prefijo.\n> Selecciona ❌ para dejar el prefijo actual (\`${guild.getPrefix()}\`).`);

    msg.channel.send(initMsg).then(() => msg.channel.send(changePrefix).then((message: any) => {
      new DiscordReaction(message, ['✅', '❌'], [msg.author.id]).listen((collected: any) => { // fine
        const reaction = collected.first();
        switch (reaction.emoji.name) {
        case '✅':
          this.changePrefix(msg, (cache: any) => {
            guild.setGuildPrefix(cache);
            this.changeDefaultChannel(msg, guild);
          });
          break;
        case '❌':
          this.changeDefaultChannel(msg, guild);
          break;
        default:
          break;
        }
      }, () => { // error
        message.reply('NONE')
      });
    }));

  }

  changeDefaultChannel(msg: any, guild: any, callback?: any) {

    const setChannel = new MessageEmbed()
      .setColor('#00fff7')
      .setTitle('Cambiar el Canal de Comandos')
      .setDescription('A continuación mencione el canal de texto sobre el cual el bot recibirá y enviará mensajes. Recuerde utilizar el simbolo `#` para poder mencionarlo correctamente.');

    msg.channel.send(setChannel).then(() => {
      const collector = new MessageCollector(msg.channel, (m: any) => m.author.id === msg.author.id, { time: 10000 });
      collector.on('collect', message => {
        if (message.mentions.channels !== undefined) {
          const channel = message.mentions.channels.first();
          if (channel.type !== 'text') {
            msg.channel.send(new MessageEmbed()
              .setColor('#f52727')
              .setTitle('💢 ¡Canal invalido!')
              .setDescription('Debes mencionar un canal de texto, por favor intentalo nuevamente.'));
          } else {
            collector.removeAllListeners();
            guild.setChannelId(channel.id);
            msg.channel.send(new MessageEmbed()
              .setColor('#34eb4f')
              .setTitle('👌 ¡Todo listo!')
              .setDescription('El servidor ha sido configurado correctamente.'));
          }
        } else {
          msg.channel.send(new MessageEmbed()
            .setColor('#f52727')
            .setTitle('💢 ¡Canal invalido!')
            .setDescription('No has mencionado el canal correctamente, por favor intentalo nuevamente.'))
        }
      })
    })

  }

  changePrefix(msg: any, callback: any) {

    const setPrefix = new MessageEmbed()
      .setColor('#00fff7')
      .setTitle('Define un Prefijo')
      .setDescription('A continuación por favor escribe el prefijo que usará el bot para los comandos (asegurate que no supere 2 digitos y que sea fácil de recordar para que no lo olvides). Ejemplos: `!`, `s%`');

    msg.channel.send(setPrefix).then(() => {
      const collector = new MessageCollector(msg.channel, (m: any) => m.author.id === msg.author.id, { time: 10000 });
      collector.on('collect', message => {
        if (message.content.length > 2 || message.content.length === 0) {
          msg.channel.send(new MessageEmbed()
            .setColor('#f52727')
            .setTitle('💢 ¡Prefijo invalido!')
            .setDescription('El prefijo que has ingresado supera los 2 caracteres, intenta utilizar otro:'))
        } else {
          collector.removeAllListeners();
          callback(message.content);
        }
      })
    });

  }

}
