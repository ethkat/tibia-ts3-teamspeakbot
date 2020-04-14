import Channels from '../api/models/channels';
import { insertChannel } from '../api/models/channels';

export const createChannel = async (teamspeak = {}, { name, type, description }, data = {}) => {
  try {
    const channel = await teamspeak.channelCreate(name, {
      ...data,
      channel_description: description,
      channel_flag_permanent: 1,
    });

    await insertChannel(channel, type);

    return channel;
  } catch (error) {
    console.error(error);
  }
};

export const updateChannel = async (teamspeak = {}, type, onlineData = {}, channelListsName = []) => (
  new Promise(async (resolve, reject) => {
    try {
      const channelFromDb = await Channels.findOne({ type });
      
      if (!channelFromDb) return;
  
      const { cid, channelName } = channelFromDb;
  
      const channelFromTs = await teamspeak.getChannelByID(cid);

      const { online, dbCharacters, description } = onlineData;

      const onlinePlayers = online ? online.length : 0;

      const charactersFromList = dbCharacters ? dbCharacters.length : 0;
  
      const newChannelName = `${channelName.replace(/ *\([^)]*\) */g, '')} (${onlinePlayers}/${charactersFromList})`;
      
      const extraEditParams = {};
      
      const isDifferentChannelName = !channelListsName.includes(newChannelName);

      if (isDifferentChannelName) {
        Object.assign(extraEditParams, { channel_name: newChannelName });
      }

      await channelFromTs.edit({
        channel_description: `Online ${onlinePlayers}/${charactersFromList} \n ${description}`,
        ...extraEditParams,
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
);
