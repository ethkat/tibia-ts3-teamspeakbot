import TibiaAPI from 'tibia-api';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateBot = new ValidatedMethod({
  name: 'tibiaRL.get.players.online',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    listId: {
      type: String,
    },
    world: {
      type: String,
    },
  }).validator(),
  async run({ name: guildUrl, world }) {
    const mediviaAPI = new TibiaAPI({ worldName: world });
    const playersOnline = await mediviaAPI.getGuildInformation({ guildUrl });

    const { members } = playersOnline;

    return members;
  },
});
