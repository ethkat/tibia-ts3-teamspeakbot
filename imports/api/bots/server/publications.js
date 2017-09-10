import { Meteor } from 'meteor/meteor';
import { Bots } from '/imports/api/bots/Bots';

Meteor.publish('bots.get', function({ owner }) {
  return Bots.find({ owner });
});
