import MediviaAPI from 'medivia-api';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateBot = new ValidatedMethod({
  name: 'medivia.get.players.online',
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
    const mediviaAPI = new MediviaAPI({ worldName: world });
    const playersOnline = await mediviaAPI.getGuildInformation({ guildUrl });

    const { members } = playersOnline;

    return members;
  },
});
