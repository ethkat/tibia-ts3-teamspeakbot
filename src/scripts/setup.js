import ora from 'ora';
import mongoose from 'mongoose';
import initServer from './init';
import { setupDB } from './setup-db';
import { createChannels } from './create-channels';
import { createServerGroups } from './server-groups';

const { MONGO_URL, MONGO_DB_NAME } = process.env;

const setup = async () => {
  const spinner = ora('creating channels');

  spinner.start('Connecting to the DB');

  mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }, async (error) => {
    if (error) {
      spinner.fail('There was some error starting the server');
    } else {
      spinner.succeed('Server running!, happy hunting');
    }
  });

  const teamspeak = await initServer();

  await setupDB(spinner);
  await createChannels(spinner);
  await createServerGroups(spinner, teamspeak);

  spinner.succeed('Done!');
  setTimeout(() => process.exit(), 500);
};

setup();
