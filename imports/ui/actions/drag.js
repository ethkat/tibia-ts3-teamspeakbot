import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const dragAll = ({ _id: botId, cid }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channel.drag', { cid, botId }, (error) => {
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
