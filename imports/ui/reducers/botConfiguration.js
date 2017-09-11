import {
  SET_SELECTED_CHANNEL,
  SET_TEAMSPEAK_CHANNELS,
} from '/imports/ui/actions/botConfiguration';

const defaultState = {
  selectedChannel: 0,
  teamspeakChannels: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_TEAMSPEAK_CHANNELS:
      return {
        ...state,
        teamspeakChannels: payload.teamspeakChannels,
      };
    case SET_SELECTED_CHANNEL:
      return {
        ...state,
        selectedChannel: payload.selectedChannel,
      };
    default:
      return state;
  }
};
