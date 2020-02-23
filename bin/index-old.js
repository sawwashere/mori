import commands from './loadCommands';
import config from '../config';
import { parseTweet } from './util/twitter';
import Discord from 'discord.js';
import Twit from 'twit';

const twit = new Twit(config.twitter).stream('user', { 'with': 'user' });
const bot = new Discord.Client();
const { discordToken, botname } = config;

let voiceChannel = null;
let textChannel = null;
let twitLoaded = false;

bot.on('ready', () => {

  const { channels } = bot;

  //voiceChannel = channels.find(channel => { return channel instanceof Discord.VoiceChannel; });
  textChannel = channels.find(channel => {
    return channel instanceof Discord.TextChannel;
  });

  bot.setPlayingGame('nocchibot testing');
  //bot.joinVoiceChannel(voiceChannel);

  if (!twitLoaded) {

    twit.on('tweet', parseTweet);
    twitLoaded = true;
  }
});

bot.on('message', message => {

  const { content, channel } = message;
  const { username } = message.author;
  const [operator, cmd] = content.toLowerCase().split(' ');

  // Don't react to ourselves
  if (username === botname) {
    return;
  }
  if (message.content === "&init") {
    // Iterate over all channels
    for (var vchannel of message.channel.server.channels) {
      // If the channel is a voice channel, ...
      if (vchannel instanceof Discord.VoiceChannel) {
        // ... reply with the channel name and the ID ...
        bot.reply(message, vchannel.name + " - " + vchannel.id);
        // ... and join the channel
        bot.joinVoiceChannel(vchannel);
        // Afterwards, break the loop so the bot doesn't join any other voice
        // channels
        break;
      }
    }
  }
  if (message.content === "&deinit") {
    bot.voiceConnection.disconnect();
  }
  const payload = {
    bot,
    message,
    channels: { textChannel, voiceChannel }
  };

  if (commands.hasOwnProperty(`${operator} ${cmd}`)) {
    commands[`${operator} ${cmd}`].run(payload);
  } else if (content === botname) {
    commands[botname].run(payload);
  } else if (content.indexOf('/') > -1 || content.indexOf('^') > -1) {
    commands['parseEmote'].run(payload);
  }
});

bot.loginWithToken(discordToken);