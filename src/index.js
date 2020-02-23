import commands from './loadCommands';
import config from '../config';
import Discord from 'discord.js';

const bot = new Discord.Client();
const { discordToken, botname } = config;

let voiceChannel = null;
let textChannel = null;
let voiceConnection = null;

bot.on('ready', () => {
    const { channels } = bot;
    //voiceChannel = channels.find(channel => { return channel instanceof Discord.VoiceChannel; });
    textChannel = channels.find(channel => { return channel instanceof Discord.TextChannel; });
    
    bot.user.setActivity('`mori gibemotes` in dm for emote list');
    //bot.joinVoiceChannel(voiceChannel);
    
    console.log('I am ready!');
});

bot.on('message', message => {

  const { content, channel } = message;
  const { username } = message.author;
  const [operator, cmd] = content.toLowerCase().split(' '); 

  // Don't react to ourselves
  if (username === botname) {
    return;
  }
    //if (message.content === "&init") {
    //    if (message.member.voiceChannel) {
    //        message.member.voiceChannel.join()
    //        .then(connection => { // Connection is an instance of VoiceConnection
    //            voiceConnection = connection;
    //        })
    //        .catch(console.log);
    //    } else {
    //        message.reply('You need to join a voice channel first!');
    //    }
    //	}
    //if (message.content === "&deinit") {
    //		voiceConnection.disconnect();
    //	}
  const payload = {
    bot,
    message,
    channels: { textChannel },
  };

  if (commands.hasOwnProperty(`${operator} ${cmd}`)) {
    commands[`${operator} ${cmd}`].run(payload);
  } else if (content === botname) {
    commands[botname].run(payload);
  } else if (content.indexOf('/') > -1 || content.indexOf('^') > -1) {
    commands['parseEmote'].run(payload);
  }
});

bot.login(discordToken);
