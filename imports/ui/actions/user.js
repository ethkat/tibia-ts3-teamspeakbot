import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const logoutUser = () => (
  (dispatch) => {
    Meteor.logout(() => dispatch(showAlert({
      type: 'success',
      message: 'Cya!',
    })));
  }
);
