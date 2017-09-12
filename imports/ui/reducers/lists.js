import {
  OPEN_NEW_LIST_MODAL,
  OPEN_NEW_ITEM_MODAL,
} from '/imports/ui/actions/lists';

const defaultState = {
  isModalOpen: false,
  isItemModalOpen: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_NEW_LIST_MODAL:
      return { isModalOpen: payload.isModalOpen };
    case OPEN_NEW_ITEM_MODAL:
      return { isItemModalOpen: payload.isItemModalOpen };
    default:
      return state;
  }
};
