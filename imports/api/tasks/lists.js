import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { createCron } from '/imports/api/tasks/config';
import { ListItems } from '/imports/api/bots/ListItems';
import { filterLists } from '/imports/utils/arrays';
import { tibiaRlGetPlayersOnline } from '/imports/api/tibia/methods';
import { updateTemspeakChannel } from '/imports/api/teamSpeak/methods';
import { mediviaGetPlayersOnline } from '/imports/api/medivia/methods';
import { sortByProfessions, buildCharacterDescription } from '/imports/api/teamSpeak/channels-utils';

const PERIOD = 'every 10 seconds';

const methodByName = {
  tibiaRl: tibiaRlGetPlayersOnline,
  medivia: mediviaGetPlayersOnline,
};

const updateChannelDescriptionByList = async ({
  cid,
  botId,
  listId,
}) => {
  const bot = Bots.findOne({ _id: botId });
  const items = ListItems.find({ listId }).fetch();

  const { world, server } = bot;

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

  const channelUpdate = await updateTemspeakChannel.call({
    botId,
    channelData,
  });

  return channelUpdate;
};

export default () => (
  Channels.find({
    channelType: 'normal',
  }).fetch().forEach(({
    _id: listId,
    cid,
    botId,
    channelName,
  }) => {
    createCron({
      job: (() => updateChannelDescriptionByList({
        cid,
        botId,
        listId,
        channelName,
      })),
      name: channelName,
      period: PERIOD,
    });
  })
);
