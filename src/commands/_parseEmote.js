import path from 'path';
import { getEmote, playSound } from '../util';
import Discord from 'discord.js';

const assetsPath = path.join(__dirname, '../../assets');
const audioPath = path.join(__dirname, '../../assets/audio/');
const emotes = require(`${assetsPath}/emotes`);
const audioEmotes = require(`${assetsPath}/audiomotes`);


class Command {

  constructor() {
    this.aliases = ['parseEmote'];
  }

  run(payload) {

    const { bot, message } = payload;
    const { content } = message;
    
    const emote = getEmote(content);
    const isPM = message.channel.isPrivate;

    if (emotes.hasOwnProperty(emote)) {
     //commented on advice of dude22072 to fix gif display
     //uncommented 6/25 after discord fixed issue upstream
     message.channel.send(emotes[emote]);
     //if(emotes[emote].substring(emotes[emote].length-5) == ".gifv") {
     //    message.channel.send("<"+emotes[emote]+">", {"embed": { "image": {"url": emotes[emote].substring(0, emotes[emote].length-1)} } });
     //} else {
     //    message.channel.send("<"+emotes[emote]+">", {"embed": { "image": {"url": emotes[emote],} } });
     //}
    }

    //if (!isPM && audioEmotes.hasOwnProperty(emote)) {
    //    playSound(payload.voiceConnection, `${audioPath}${audioEmotes[emote]}`);
    //}

  }

}

module.exports = new Command();
