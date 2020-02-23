import path from 'path';
import { playSound } from '../util';
import config from '../../config';

const assetsPath = path.join(__dirname, '../../assets');
const audioPath = path.join(__dirname, '../../assets/audio/');
const audioEmotes = require(`${assetsPath}/audiomotes`);


class Command {

  constructor() {
    this.aliases = [config.botname];
  }

  run(payload) {

    const { bot, message, channels: { textChannel, voiceChannel }, voiceConnection } = payload;
    const { botname } = config;

    const isPM = message.channel.isPrivate;

    message.channel.send(`${botname} desu.`);

    //if (!isPM) {
    //  playSound(payload.voiceConnection, `${audioPath}${audioEmotes['nocchi']}`);
    //}

  }

}

module.exports = new Command();
