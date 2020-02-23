import config from '../../config';
import { getRandom } from '../util';

class Command {
  constructor() {
    this.aliases = ['gibemotes'];
  }
  run(payload) {
    if (payload.message.content.search(new RegExp('audio', 'i')) > -1) {
      payload.message.author.send("Audio Emote List:", {
        "file": "./assets/audiomotes.json"
      });
    } else {
      payload.message.author.send("Emote List:", {
        "file": "./assets/emotes.json"
      });
    }
  }
}

module.exports = new Command();