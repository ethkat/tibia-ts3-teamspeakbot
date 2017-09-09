import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const loginUser = ({ email, password }) => (
  (dispatch) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Logged in',
        }));
      }
    });
  }
);
