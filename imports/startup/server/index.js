import { Meteor } from 'meteor/meteor';

import initData from '/imports/startup/server/seed';

// Bots

import '/imports/api/bots/methods';

Meteor.startup(() => {
  initData();
});
