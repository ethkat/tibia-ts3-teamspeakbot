import { OPEN_NEW_LIST_MODAL } from '/imports/ui/actions/lists';

const defaultState = {
  isModalOpen: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_NEW_LIST_MODAL:
      return { isModalOpen: payload.isModalOpen };
    default:
      return state;
  }
};
