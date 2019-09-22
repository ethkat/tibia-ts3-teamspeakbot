import mongoose from 'mongoose';
import initServer from './init';
import { createChannel } from './channels';
import { INITIAL_CHANNELS } from '../utils/constants';

export const createChannels = async (spinner) => {
  try {
    spinner.text = 'Creating Channels';

    const { MONGO_URL, MONGO_DB_NAME } = process.env;

    mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, { useNewUrlParser: true }, async (error) => {
      if (error) {
        spinner.fail('There was some error starting the server');
      } else {
        spinner.text = 'Connected to the DB succesfully';
        const teamspeak = await initServer();
    
        await Promise.all(INITIAL_CHANNELS.map((ch) => (
          new Promise(async (resolve) => {
            const channel = await createChannel(teamspeak, ch);
            resolve(channel);
          })
        )));
      }
    });
  } catch (error) {
    console.error(error);
  } 
};
