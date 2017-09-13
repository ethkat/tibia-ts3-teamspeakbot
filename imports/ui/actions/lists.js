import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';
import { createListItem } from '/imports/api/bots/methods';

export const CREATE_LIST = 'CREATE_LIST';
export const CREATE_LIST_ITEM = 'CREATE_LIST_ITEM';
export const OPEN_NEW_LIST_MODAL = 'OPEN_NEW_LIST_MODAL';
export const OPEN_NEW_ITEM_MODAL = 'OPEN_NEW_ITEM_MODAL';

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

export const openNewItemModal = ({ isItemModalOpen = true } = {}) => ({
  type: OPEN_NEW_ITEM_MODAL,
  payload: { isItemModalOpen },
});

export const createItem = ({ name, listId }, cb) => (
  (dispatch) => {
    createListItem.call({ listId, name }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Item Created',
        }));
        if (cb && typeof cb === 'function') cb();
      }
    });
  }
);

export const createItemFromUrl = ({ name, server, world, listId }, cb) => (
  (dispatch) => {
    Meteor.call(`${server}.get.players.online`, { name, listId, world }, (error, result) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        result.forEach(({ name: characterName }) => {
          dispatch(createItem({
            name: characterName,
            listId,
          }));
        });
        if (cb && typeof cb === 'function') cb();
      }
    });
  }
);
