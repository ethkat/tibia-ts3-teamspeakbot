import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const sendPoke = ({ _id: botId, message }) => (
  (dispatch) => {
    Meteor.call('teamspeak.poke.send', { botId, message }, (error) => {
      if (error) {
        dispatch(showAlert({
          type: 'danger',
          message: error.message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Done!',
        }));
      }
    });
  }
);
