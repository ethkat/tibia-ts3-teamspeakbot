import { OPEN_NEW_SERVER_QUERY_USER_MODAL } from '/imports/ui/actions/serverQueryUsers';

const defaultState = {
  isOpen: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_NEW_SERVER_QUERY_USER_MODAL:
      return { isOpen: payload.isOpen };
    default:
      return state;
  }
};
