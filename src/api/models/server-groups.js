import mongoose from 'mongoose';

const serverGroupsSchema = new mongoose.Schema({
  sgid: {
    type: Number,
  },
  name: {
    type: String,
  },
});

const ServerGroups = mongoose.model('serverGroups', serverGroupsSchema, 'serverGroups');

export const insertServerGroup = async (serverGroup = {}) => (
  new Promise(async (resolve, reject) => {
    try {
      const newServerGroup = new ServerGroups(serverGroup);

      await newServerGroup.save();
  
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export default ServerGroups;
