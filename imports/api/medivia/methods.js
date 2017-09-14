import MediviaAPI from 'medivia-api';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const mediviaGetGuildPlayers = new ValidatedMethod({
  name: 'medivia.get.guild.players',
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
    const guildMembers = await mediviaAPI.getGuildInformation({ guildUrl });

    const { members } = guildMembers;

    return members;
  },
});

export const mediviaGetPlayersOnline = new ValidatedMethod({
  name: 'medivia.get.players.online',
  validate: new SimpleSchema({
    world: {
      type: String,
    },
  }).validator(),
  async run({ world }) {
    const mediviaAPI = new MediviaAPI({ worldName: world });
    const playersOnline = await mediviaAPI.getOnlinePlayers();

    return playersOnline;
  },
});

export const mediviaGetPlayerInformation = new ValidatedMethod({
  name: 'medivia.get.player.information',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    world: {
      type: String,
    },
  }).validator(),
  async run({ name, world }) {
    const mediviaAPI = new MediviaAPI({ worldName: world });
    const playerInformation = await mediviaAPI.getCharacterInformation({
      characterName: name,
    });

    return playerInformation;
  },
});
