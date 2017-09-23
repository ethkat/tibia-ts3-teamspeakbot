import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { sendPoke } from '/imports/api/teamSpeak/poke';
import { clientKick, getClientsList } from '/imports/api/teamSpeak/clients';
import { MASTER_CHANNELS } from '/imports/api/teamSpeak/constants';
import {
  logoutFromServer,
  loginToServerQuery,
  initTeamspeakClient,
} from '/imports/api/teamSpeak/login-utils';
import {
  createChannel,
  deleteChannel,
  updateChannel,
  getChannelsAPI,
  dragAllToChannel,
} from '/imports/api/teamSpeak/channels';

const defaultErrorMsg = 'Something went wrong with your bot, please check the data you passed';

const updateBot = ({ botId: _id, hasError, message }) => (
  Bots.update({ _id }, {
    $set: {
      error: hasError,
      errorMessage: message,
    },
  })
);

const insertMasterChannels = ({ channel, index }) => {
  const { cid, botId, channel_name: channelName } = channel;
  let channelType = 'wrapper';
  if (index === 1) channelType = 'master';
  return Channels.insert({
    cid,
    botId,
    channelType,
    channelName,
  });
};

export const testBot = new ValidatedMethod({
  name: 'teamspeak.bot.test',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  async run({ botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });
      const channels = await getChannelsAPI({ teamspeak });
      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, message: '' });
      return channels;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});


export const getChannels = new ValidatedMethod({
  name: 'teamspeak.channels.get',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  async run({ botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });
      const channels = await getChannelsAPI({ teamspeak });
      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, message: '' });
      return channels;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const createMasterChannels = new ValidatedMethod({
  name: 'teamspeak.channels.create.masters',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
    selectedChannel: {
      type: Number,
    },
  }).validator(),
  async run({ botId, selectedChannel }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const channels = await Promise.all(MASTER_CHANNELS.map(channel => createChannel({
        channel: {
          cpid: selectedChannel,
          channel_name: channel,
        },
        teamspeak,
      })));

      const channelsInserted = channels.forEach((channel, index) => (
        insertMasterChannels({
          index,
          channel: {
            botId,
            ...channel,
          },
        })
      ));

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, message: '' });

      return channelsInserted;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: false, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const deleteMasterChannels = new ValidatedMethod({
  name: 'teamspeak.channels.master.delete',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  async run({ botId }) {
    try {
      const channels = Channels.find({
        botId,
        channelType: {
          $in: ['wrapper', 'master'],
        },
      }).fetch();
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      await Promise.all(channels.map(({ cid }) => deleteChannel({
        cid,
        teamspeak,
      })));

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return channels.forEach(({ _id }) => Channels.remove({ _id }));
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const createNormalChannel = new ValidatedMethod({
  name: 'teamspeak.channels.createNormalChannel',
  validate: new SimpleSchema({
    list: {
      type: Object,
      blackbox: true,
    },
    botId: {
      type: String,
    },
  }).validator(),
  async run({ list, botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });
      const masterChannel = Channels.findOne({
        botId,
        channelType: 'master',
      });
      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const { name } = list;
      const { cid: cpid } = masterChannel;

      const channel = await createChannel({
        channel: { cpid, channel_name: name },
        teamspeak,
      });

      const { cid } = channel;

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return Channels.insert({
        cid,
        botId,
        channelName: name,
        channelType: 'normal',
      });
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const deleteChannelList = new ValidatedMethod({
  name: 'teamspeak.channels.delete.list',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
    botId: {
      type: String,
    },
  }).validator(),
  async run({ _id, botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });
      const channelToDelete = Channels.findOne({ _id });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const { cid } = channelToDelete;

      await deleteChannel({
        cid,
        teamspeak,
      });

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return Channels.remove({ _id });
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const updateTemspeakChannel = new ValidatedMethod({
  name: 'teamspeak.channels.update',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
    channelData: {
      type: Object,
      blackbox: true,
    },
  }).validator(),
  async run({ botId, channelData }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, serverId, username, password } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });
      const response = await updateChannel({ teamspeak, channelData });
      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return response;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const sendTeamSpeakPoke = new ValidatedMethod({
  name: 'teamspeak.poke.send',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
    message: {
      type: String,
    },
  }).validator(),
  async run({ botId, message }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const clients = await getClientsList({ teamspeak });
      const pokes = await Promise.all(clients.map(({ clid }) => sendPoke({
        clid,
        message,
        teamspeak,
      })));

      await logoutFromServer({ botId, teamspeak });
      updateBot({ botId, hasError: false, error: '' });

      return pokes;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const dragToAll = new ValidatedMethod({
  name: 'teamspeak.channel.drag',
  validate: new SimpleSchema({
    cid: {
      type: Number,
    },
    botId: {
      type: String,
    },
  }).validator(),
  async run({ cid, botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const clients = await getClientsList({ teamspeak });
      const drags = await Promise.all(clients.map(({ clid }) => dragAllToChannel({
        clientData: {
          cid,
          clid,
        },
        teamspeak,
      })));

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return drags;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});

export const massKickAll = new ValidatedMethod({
  name: 'teamspeak.channels.kick.all',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  async run({ botId }) {
    try {
      const bot = Bots.findOne({ _id: botId });

      const { port, address, username, password, serverId } = bot;

      const teamspeak = await loginToServerQuery({
        port,
        botId,
        address,
        serverId,
        username,
        password,
        teamspeak: await initTeamspeakClient({ port, botId, address }),
      });

      const clients = await getClientsList({ teamspeak });
      const drags = await Promise.all(clients.map(({ clid }) => clientKick({
        kickData: {
          clid,
          reasonid: 5,
          reasonmsg: 'MASS KICK',
        },
        teamspeak,
      })));

      await logoutFromServer({ botId, teamspeak });

      updateBot({ botId, hasError: false, error: '' });

      return drags;
    } catch (error) {
      const errorToPass = error.message || defaultErrorMsg;
      updateBot({ botId, hasError: true, message: errorToPass });
      throw new Meteor.Error('ERROR!', errorToPass);
    }
  },
});
