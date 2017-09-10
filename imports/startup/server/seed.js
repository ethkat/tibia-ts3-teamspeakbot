import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Bots } from '/imports/api/bots/Bots';

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
      Bots.insert({
        name: 'Test Bot',
        owner: userId,
      });
      console.log('### Seed Data Created ###');
      console.log(`Login with credentials: ${admin.email} / ${admin.password}`);
    }
  }
};
