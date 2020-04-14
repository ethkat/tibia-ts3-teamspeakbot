import ora from 'ora';
import mongoose from 'mongoose';

const { MONGO_URL, MONGO_DB_NAME } = process.env;

const restart = async () => {
  const spinner = ora('Restarting BOT');

  spinner.start('Connecting to the DB');

  mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }, async (error) => {
    if (error) {
      spinner.fail('There was some error starting the server');
    } else {
      await mongoose.connection.collection(MONGO_DB_NAME).drop();
      spinner.succeed('Server has been restarted!, be sure to manually delete "ts3server.sqlitedb" on the root project');
    }
  });

  spinner.succeed('Done!');
  setTimeout(() => process.exit(), 500);
};

restart();
