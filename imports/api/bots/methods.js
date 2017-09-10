import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Bots } from '/imports/api/bots/Bots';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';

export const insertBot = new ValidatedMethod({
  name: 'bots.insert',
  validate: new SimpleSchema({
    bot: {
      type: Object,
      blackbox: true,
    },
  }).validator(),
  run({ bot }) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('bots.insert.unauthorized',
        'Sorry, but you must be online to create a bot (=');
    }
    return Bots.insert({
      ...bot,
      owner: userId,
    });
  },
});

export const serverQueryUser = new ValidatedMethod({
  name: 'serverQueryUser.insert',
  validate: new SimpleSchema({
    user: {
      type: Object,
      blackbox: true,
    },
  }).validator(),
  run({ user }) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('serverQueryUser.insert.unauthorized',
        'Sorry, but you must be online to create a query user (=');
    }
    return ServerQueryUsers.insert(user);
  },
});
