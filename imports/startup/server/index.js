import { Meteor } from 'meteor/meteor';

import initData from '/imports/startup/server/seed';

// Bots

import '/imports/api/bots/methods';
import '/imports/api/bots/server/publications';

// Teamspeak

import '/imports/api/teamSpeak/methods';

Meteor.startup(() => {
  initData();
});
