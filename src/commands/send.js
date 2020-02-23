import path from 'path';
import { getImage } from '../util';
import Discord from 'discord.js';


class Command {

  constructor() {
    this.aliases = ['send'];
  }

  run(payload) {

    const { bot, message } = payload;
    const { content } = message;
    
    const splitted = content.split(' ');
    var image = splitted[2];
    if (image.indexOf('http') === -1) {
      message.channel.send("That's not a link.");
    }
    if(image.substring(0,1)=="<") {
        image = image.substring(1, image.length-1);
    }
    if(image.substring(image.length-5) == ".gifv") {
        image = image.substring(0, image.length-1);
    }
    message.channel.send("", {"embed": { "image": {"url": image,} } });
  }

}

module.exports = new Command();
