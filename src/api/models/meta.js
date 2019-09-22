import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({
  lastCheck: {
    type: Date,
  }
});

const Meta = mongoose.model('Meta', metaSchema, 'meta');

export const updateMeta = async () => (
  new Promise(async (resolve, reject) => {
    try {
      const queryMeta = await Meta.findOne();

      await Meta.findByIdAndUpdate(queryMeta._id, { $set: { lastCheck: new Date() } });
  
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export default Meta;
