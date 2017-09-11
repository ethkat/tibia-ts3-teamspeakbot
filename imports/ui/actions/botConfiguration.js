import { Meteor } from 'meteor/meteor';
import { showAlert } from '/imports/ui/actions/alerts';

export const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';
export const SET_TEAMSPEAK_CHANNELS = 'SET_TEAMSPEAK_CHANNELS';

export const setTeamspeakChannels = ({ teamspeakChannels }) => ({
  type: SET_TEAMSPEAK_CHANNELS,
  payload: { teamspeakChannels },
});

export const selectChannel = ({ selectedChannel }) => ({
  type: SET_SELECTED_CHANNEL,
  payload: { selectedChannel },
});

export const onUpdateBot = ({ bot }) => (
  (dispatch) => {
    Meteor.call('bots.update', { bot }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Bot is All setup!',
        }));
      }
    });
  }
);

export const onDeleteMasterChannels = ({ botId }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.master.delete', { botId }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Channels deleted',
        }));
      }
    });
  }
);

export const getTeamspeakChannels = ({ botId }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.get', { botId }, (error, teamspeakChannels) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(setTeamspeakChannels({ teamspeakChannels }));
      }
    });
  }
);

export const createMasterChannels = ({ botId, selectedChannel }) => (
  (dispatch) => {
    Meteor.call('teamspeak.channels.create.masters', { botId, selectedChannel }, (error) => {
      if (error) {
        const { message } = error;
        dispatch(showAlert({
          type: 'danger',
          message,
        }));
      } else {
        dispatch(showAlert({
          type: 'success',
          message: 'Channels created, please check on your Teamspeak and let us know if it work',
        }));
      }
    });
  }
);
