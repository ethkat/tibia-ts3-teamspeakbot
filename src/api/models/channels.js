import mongoose from 'mongoose';

const channelsSchema = new mongoose.Schema({
  cid: {
    type: Number,
  },
  channelName: {
    type: String,
  },
  pid: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const Channel = mongoose.model('Channel', channelsSchema, 'channels');

export const insertChannel = async (channel = {}, type) => (
  new Promise(async (resolve, reject) => {
    try {
      const { propcache } = channel;

      const { pid, cid, channel_name: channelName } = propcache;
      
      const newChannel = new Channel({
        cid,
        pid,
        type,
        channelName,
      });

      await newChannel.save();
  
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export default Channel;
