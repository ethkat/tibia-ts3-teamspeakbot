import { Meteor } from 'meteor/meteor';
import { Bots } from '/imports/api/bots/Bots';

Meteor.publish('bot.get', function({ _id }) {
  if (!_id) return this.ready();
  return Bots.find({ _id });
});


Meteor.publish('bots.get', function() {
  const { userId: owner } = this;
  return Bots.find({ owner });
});
