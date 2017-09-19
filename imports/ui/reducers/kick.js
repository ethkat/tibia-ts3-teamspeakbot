import { KICK_TYPE } from '/imports/ui/actions/kick';

const defaultState = {
  kickType: 'all',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case KICK_TYPE:
      return { kickType: payload.kickType };
    default:
      return state;
  }
};
