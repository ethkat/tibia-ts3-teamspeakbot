import ora from 'ora';
import mongoose from 'mongoose';
import initServer from './init';
import { updateMeta } from '../api/models/meta';

const spinner = ora('Starting TS server BOT');

const startServer = async () => {
  try {
    spinner.start();
    
    await initServer();

    const { MONGO_URL, MONGO_DB_NAME } = process.env;

    mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }, async (error) => {
      if (error) {
        spinner.fail('There was some error starting the server');
      } else {
        spinner.succeed('Server running!, happy hunting');
      }
    });

    await updateMeta();
  } catch (error) {
    console.error(error);
  } 
};

startServer();
