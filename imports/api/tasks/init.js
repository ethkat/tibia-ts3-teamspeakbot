import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

import initBotTask from '/imports/api/tasks/lists';

Meteor.startup(() => {
  initBotTask();

  SyncedCron.start();
});
