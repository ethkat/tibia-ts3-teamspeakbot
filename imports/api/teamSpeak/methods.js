import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { MASTER_CHANNELS } from '/imports/api/teamSpeak/constants';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';
import { loginToServerQuery, initTeamspeakClient } from '/imports/api/teamSpeak/login-utils';
import { createChannel, deleteChannel, getChannelsAPI } from '/imports/api/teamSpeak/channels';

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

export const getChannels = new ValidatedMethod({
  name: 'teamspeak.channels.get',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  async run({ botId }) {
    const bot = Bots.findOne({ _id: botId });
    const queryUser = ServerQueryUsers.findOne({ botId });

    const { username, password } = queryUser;
    const { port, address, serverId } = bot;

    const teamspeak = await loginToServerQuery({
      serverId,
      username,
      password,
      teamspeak: initTeamspeakClient({ port, address }),
    });
    const channels = await getChannelsAPI({ teamspeak });
    return channels;
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
    const bot = Bots.findOne({ _id: botId });
    const queryUser = ServerQueryUsers.findOne({ botId });

    const { username, password } = queryUser;
    const { port, address, serverId } = bot;

    const teamspeak = await loginToServerQuery({
      serverId,
      username,
      password,
      teamspeak: initTeamspeakClient({ port, address }),
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

    return channelsInserted;
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
    const channels = Channels.find({
      botId,
      channelType: {
        $in: ['wrapper', 'master'],
      },
    }).fetch();
    const bot = Bots.findOne({ _id: botId });
    const queryUser = ServerQueryUsers.findOne({ botId });

    const { username, password } = queryUser;
    const { port, address, serverId } = bot;

    const teamspeak = await loginToServerQuery({
      serverId,
      username,
      password,
      teamspeak: initTeamspeakClient({ port, address }),
    });

    await Promise.all(channels.map(({ cid }) => deleteChannel({
      cid,
      teamspeak,
    })));

    return channels.forEach(({ _id }) => Channels.remove({ _id }));
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
    const bot = Bots.findOne({ _id: botId });
    const queryUser = ServerQueryUsers.findOne({ botId });
    const masterChannel = Channels.findOne({
      botId,
      channelType: 'master',
    });
    const { username, password } = queryUser;
    const { port, address, serverId } = bot;

    const teamspeak = await loginToServerQuery({
      serverId,
      username,
      password,
      teamspeak: initTeamspeakClient({ port, address }),
    });

    const { name } = list;
    const { cid: cpid } = masterChannel;

    const channel = await createChannel({
      channel: { cpid, channel_name: name },
      teamspeak,
    });

    const { cid } = channel;

    return Channels.insert({
      cid,
      botId,
      channelName: name,
      channelType: 'normal',
    });
  },
});
