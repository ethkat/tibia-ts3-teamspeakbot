import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Bots } from '/imports/api/bots/Bots';
import { SERVERS } from '/imports/utils/constants';

const worldsByServer = {
  tibiaRL: 'Zanera',
  medivia: 'Destiny',
};

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
      console.log('### Seed Data Created ###');
      console.log(`Login with credentials: ${admin.email} / ${admin.password}`);
    }
  }
};
