import { insertBot } from '/imports/api/bots/methods';
import { showAlert } from '/imports/ui/actions/alerts';

export const OPEN_NEW_BOT_MODAL = 'OPEN_NEW_BOT_MODAL';

export const openNewBotModal = ({ isOpen = true } = {}) => ({
  type: OPEN_NEW_BOT_MODAL,
  payload: { isOpen },
});

export const insertNewBot = ({ bot = {} } = {}, cb) => (
  (dispatch) => {
    insertBot.call({ bot }, (error, result) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Bot Created',
        }));
        cb(result);
      }
    });
  }
);
