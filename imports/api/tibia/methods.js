import TibiaAPI from 'tibia-api';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const tibiaRLGetGuildPlayers = new ValidatedMethod({
  name: 'tibiaRL.get.guild.players',
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
    const tibiaAPI = new TibiaAPI({ worldName: world });
    const guildMembers = await tibiaAPI.getGuildInformation({ guildUrl });

    const { members } = guildMembers;

    return members;
  },
});

export const tibiaRlGetPlayersOnline = new ValidatedMethod({
  name: 'tibiaRl.get.players.online',
  validate: new SimpleSchema({
    world: {
      type: String,
    },
  }).validator(),
  async run({ world }) {
    const tibiaAPI = new TibiaAPI({ worldName: world });
    const playersOnline = await tibiaAPI.getOnlinePlayers();

    const { members } = playersOnline;

    return members;
  },
});

export const tibiaGetPlayerInformation = new ValidatedMethod({
  name: 'tibia.get.player.information',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    world: {
      type: String,
    },
  }).validator(),
  async run({ name, world }) {
    const tibiaAPI = new TibiaAPI({ worldName: world });
    const playerInformation = await tibiaAPI.getCharacterInformation(name);

    return playerInformation;
  },
});
