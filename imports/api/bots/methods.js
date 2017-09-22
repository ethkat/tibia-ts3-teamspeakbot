import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { ListItems } from '/imports/api/bots/ListItems';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';
import { tibiaGetPlayerInformation } from '/imports/api/tibia/methods';
import { mediviaGetPlayerInformation } from '/imports/api/medivia/methods';

const playerInformationByServer = {
  tibiaRL: tibiaGetPlayerInformation,
  medivia: mediviaGetPlayerInformation,
};

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
  async run({ listId, name }) {
    return ListItems.insert({
      name,
      listId,
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


export const removeBot = new ValidatedMethod({
  name: 'bots.remove',
  validate: new SimpleSchema({
    botId: {
      type: String,
    },
  }).validator(),
  run({ botId: _id }) {
    const { userId } = this;
    const bot = Bots.findOne({ _id });
    if (!userId) {
      throw new Meteor.Error('bots.remove.unauthorized',
        'Sorry, but you must be online to delete a bot (=');
    }
    if (bot.owner !== userId) {
      throw new Meteor.Error('bots.remove.unauthorized',
        'Sorry, this is not your bot (=');
    }
    return Bots.remove(_id);
  },
});

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
    const doc = Bots.findOne({ _id: bot._id });
    if (!userId) {
      throw new Meteor.Error('bots.update.unauthorized',
        'Sorry, but you must be online to create a bot (=');
    }
    if (doc.owner !== userId) {
      throw new Meteor.Error('bots.update.unauthorized',
        'Sorry, this is not your bot (=');
    }
    const _id = bot._id;
    delete bot._id;
    return Bots.update(_id, {
      $set: bot,
    });
  },
});
