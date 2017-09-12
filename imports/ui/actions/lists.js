import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const CREATE_LIST = 'CREATE_LIST';
export const OPEN_NEW_LIST_MODAL = 'OPEN_NEW_LIST_MODAL';

export const openNewListModal = ({ isModalOpen = true } = {}) => ({
  type: OPEN_NEW_LIST_MODAL,
  payload: { isModalOpen },
});

export const createList = ({ list, botId }, cb) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.createNormalChannel', { list, botId }, (error) => {
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
        cb();
      }
    });
  }
);

export const deleteList = ({ _id, botId }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.delete.list', { _id, botId }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'List Removed',
        }));
      }
    });
  }
);
