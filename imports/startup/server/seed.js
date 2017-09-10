import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Bots } from '/imports/api/bots/Bots';
import { SERVERS } from '/imports/utils/constants';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';

const worldsByServer = {
  tibiaRL: 'Zanera',
  medivia: 'Destiny',
};

const TEST_DATA = Meteor.settings && Meteor.settings.TEST_DATA;
const testDataExists = TEST_DATA && TEST_DATA.length;

export default () => {
  if (Meteor.isDevelopment) {
    if (Meteor.users.find().count() === 0) {
      console.log('### Creating Seed Data ###');
      const email = 'ethan.rosanoo@gmail.com';
      const admin = {
        email,
        username: email,
        password: '123456',
      };
      const userId = Accounts.createUser(admin);

      SERVERS.forEach((server) => {
        const world = worldsByServer[server];
        Bots.insert({
          name: `${server}-${world} BOT`,
          world,
          owner: userId,
          server,
        });
      });

      if (testDataExists) {
        console.log(`### Creating Seed Data from TEST_DATA, a total of ${TEST_DATA.length} bots ###`);
        TEST_DATA.forEach(({ bot, user, server }) => {
          const world = worldsByServer[server];
          Bots.insert({
            name: `${server}-${world} BOT WITH DATA`,
            world,
            owner: userId,
            server,
            ...bot,
          }, (error, botId) => {
            ServerQueryUsers.insert({
              botId,
              ...user,
            });
          });
        });
      }

      console.log('### Seed Data Created ###');
      console.log(`Login with credentials: ${admin.email} / ${admin.password}`);
    }
  }
};
