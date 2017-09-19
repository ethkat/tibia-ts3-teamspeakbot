import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const KICK_TYPE = 'KICK_TYPE';

export const setKickType = ({ kickType = 'channels' } = {}) => ({
  type: KICK_TYPE,
  payload: { kickType },
});

export const massKick = ({ _id: botId }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.kick.all', { botId }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'List Created',
        }));
      }
    });
  }
);
