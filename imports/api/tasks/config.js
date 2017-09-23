import { SyncedCron } from 'meteor/percolate:synced-cron';

SyncedCron.config({
  log: false,
  collectionName: 'cronHistory',
});

export const createCron = ({
  job,
  name,
  period,
}) => {
  SyncedCron.add({
    job,
    name,
    schedule(parser) {
      return parser.text(period);
    },
  });
};
