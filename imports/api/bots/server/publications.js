import { Meteor } from 'meteor/meteor';

import { Bots } from '/imports/api/bots/Bots';
import { Channels } from '/imports/api/bots/Channels';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';

Meteor.publish('bot.get', function({ _id }) {
  return Bots.find({ _id });
});


Meteor.publish('bots.get', function() {
  const { userId: owner } = this;
  return Bots.find({ owner });
});

Meteor.publish('queryUser.get', function({ botId }) {
  return ServerQueryUsers.find({ botId });
});

Meteor.publish('channels.get', function({ _id: botId }) {
  return Channels.find({ botId, channelType: 'normal' });
});
