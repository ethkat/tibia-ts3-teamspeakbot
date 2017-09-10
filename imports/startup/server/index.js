import { Meteor } from 'meteor/meteor';

import initData from '/imports/startup/server/seed';

// Bots

import '/imports/api/bots/methods';
import '/imports/api/bots/server/publications';

Meteor.startup(() => {
  initData();
});
