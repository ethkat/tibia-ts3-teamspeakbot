import { OPEN_NEW_BOT_MODAL } from '/imports/ui/actions/bots';

const defaultState = {
  isOpen: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_NEW_BOT_MODAL:
      return { isOpen: payload.isOpen };
    default:
      return state;
  }
};
