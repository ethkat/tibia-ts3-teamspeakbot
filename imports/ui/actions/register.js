import { Accounts } from 'meteor/accounts-base';

import { showAlert } from '/imports/ui/actions/alerts';

export const registerUser = ({
  email, password,
}) => (
  (dispatch) => {
    Accounts.createUser({
      email,
      password,
      username: email,
    }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'success',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: `Welcome in ${email}`,
        }));
      }
    });
  }
);
