import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Bots } from '/imports/api/bots/Bots';
import { ListItems } from '/imports/api/bots/ListItems';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';

export const updateBot = new ValidatedMethod({
  name: 'bots.update',
  validate: new SimpleSchema({
    bot: {
      type: Object,
      blackbox: true,
    },
  }).validator(),
  run({ bot }) {
    const { userId } = this;
    const { _id, owner } = bot;
    if (userId !== owner) {
      throw new Meteor.Error('bots.insert.unauthorized',
        'Sorry, this its not yuor bot');
    }
    return Bots.update({ _id }, { $set: bot });
  },
});

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

export const createListItem = new ValidatedMethod({
  name: 'listItems.create',
  validate: new SimpleSchema({
    listId: { type: String },
    name: { type: String },
  }).validator(),
  run({ listId, name }) {
    return ListItems.insert({
      listId,
      name,
    });
  },
});

export const deleteListItem = new ValidatedMethod({
  name: 'listItems.delete',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    return ListItems.remove(_id);
  },
});
