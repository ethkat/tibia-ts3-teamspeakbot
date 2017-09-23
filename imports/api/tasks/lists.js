import { Meteor } from 'meteor/meteor';
import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { createCron } from '/imports/api/tasks/config';
import { ListItems } from '/imports/api/bots/ListItems';
import { filterLists } from '/imports/utils/arrays';
import { tibiaRlGetPlayersOnline } from '/imports/api/tibia/methods';
import { updateTemspeakChannel } from '/imports/api/teamSpeak/methods';
import { mediviaGetPlayersOnline } from '/imports/api/medivia/methods';
import { sortByProfessions, buildCharacterDescription } from '/imports/api/teamSpeak/channels-utils';

const updateBot = ({ botId: _id, hasError, message }) => (
  Bots.update({ _id }, {
    $set: {
      error: hasError,
      errorMessage: message,
    },
  })
);

const PERIOD = 'every 10 seconds';

const methodByName = {
  tibiaRl: tibiaRlGetPlayersOnline,
  medivia: mediviaGetPlayersOnline,
};

const defaultErrorMsg = 'Something went wrong with your bot, please check the data you passed';

const updateChannelDescriptionByList = async ({
  cid,
  botId,
  listId,
}) => {
  try {
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

    updateBot({ botId, hasError: false, message: '' });

    return channelUpdate;
  } catch (error) {
    const errorToPass = error.message || defaultErrorMsg;
    updateBot({ botId, hasError: true, message: errorToPass });
    throw new Meteor.Error('ERROR!', errorToPass);
  }
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
      async job() {
        const description = await updateChannelDescriptionByList({
          cid,
          botId,
          listId,
          channelName,
        });
        return description;
      },
      name: channelName,
      period: PERIOD,
    });
  })
);
