import { showAlert } from '/imports/ui/actions/alerts';
import { serverQueryUser } from '/imports/api/bots/methods';

export const OPEN_NEW_SERVER_QUERY_USER_MODAL = 'OPEN_NEW_SERVER_QUERY_USER_MODAL';

export const openNewServerQueryUserModal = ({ isOpen = true } = {}) => ({
  type: OPEN_NEW_SERVER_QUERY_USER_MODAL,
  payload: { isOpen },
});

export const insertServerQueryUser = ({ user = {} } = {}, cb) => (
  (dispatch) => {
    serverQueryUser.call({ user }, (error, result) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'ServerQuery Added',
        }));
        cb(result);
      }
    });
  }
);
