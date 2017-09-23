import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';
import { insertBot, removeBot, updateBot } from '/imports/api/bots/methods';


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

export const deleteBot = ({ botId = '' } = {}, cb) => (
  (dispatch) => {
    removeBot.call({ botId }, (error, result) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Bot Deleted',
        }));
        cb(result);
      }
    });
  }
);

export const editBot = ({ bot = {} } = {}, cb) => (
  (dispatch) => {
    updateBot.call({ bot }, (error, result) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Saved',
        }));
        cb(result);
      }
    });
  }
);

export const testBot = ({ botId = {} } = {}) => (
  (dispatch) => {
    Meteor.call('teamspeak.bot.test', { botId }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Test End',
        }));
      }
    });
  }
);
