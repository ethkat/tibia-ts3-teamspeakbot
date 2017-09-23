import { Meteor } from 'meteor/meteor';
import {
  logoutFromServer,
  loginToServerQuery,
  initTeamspeakClient,
} from '/imports/api/teamSpeak/login-utils';
import { Bots } from '/imports/api/bots/Bots';
import { filterLists } from '/imports/utils/arrays';
import { Channels } from '/imports/api/bots/Channels';
import { createCron } from '/imports/api/tasks/config';
import { ListItems } from '/imports/api/bots/ListItems';
import { updateChannel } from '/imports/api/teamSpeak/channels';
import { tibiaRlGetPlayersOnline } from '/imports/api/tibia/methods';
import { mediviaGetPlayersOnline } from '/imports/api/medivia/methods';
import { sortByProfessions, buildCharacterDescription } from '/imports/api/teamSpeak/channels-utils';

const methodByName = {
  tibiaRl: tibiaRlGetPlayersOnline,
  medivia: mediviaGetPlayersOnline,
};

const PERIOD = 'every 3 seconds';

const mapListToChannelData = ({ world, server }) => (
  async (list) => {
    const {
      _id: listId,
      cid,
    } = list;
    const items = ListItems.find({ listId }).fetch();

    const playersOnline = await methodByName[server].call({ world });

    const itemsCounts = items.length;

    const channelData = { cid };

    const onlinePlayersFromList = sortByProfessions({
      items: filterLists(playersOnline, items, 'name', 'name'),
    });

    const onlinePlayersFromListCount = onlinePlayersFromList.length;

    let description = `Online ${onlinePlayersFromListCount}/${itemsCounts} \n \n`;

    onlinePlayersFromList.forEach((item) => {
      description += buildCharacterDescription({ item });
      return description;
    });

    channelData.channel_description = description;

    return channelData;
  }
);

export default () => {
  Bots.find().fetch().forEach(({
    _id: botId,
    port,
    name,
    world,
    server,
    address,
    serverId,
    username,
    password,
  }) => {
    createCron({
      async job() {
        try {
          const botLists = Channels.find({
            botId,
            channelType: 'normal',
          }).fetch();

          const newChannelDescriptions = await Promise.all(
            botLists.map(mapListToChannelData({ world, server })),
          );

          const teamspeak = await loginToServerQuery({
            port,
            botId,
            address,
            serverId,
            username,
            password,
            teamspeak: await initTeamspeakClient({ port, botId, address }),
          });

          const channelsUpdate = await Promise.all(
            newChannelDescriptions.map(channelData =>
              updateChannel({ teamspeak, channelData })),
          );
          await logoutFromServer({ botId, teamspeak });

          return channelsUpdate;
        } catch ({ message }) {
          throw new Meteor.Error('CRONE TASK ERROR', { message });
        }
      },
      name,
      period: PERIOD,
    });
  });
};
