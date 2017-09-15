export const getChannelsAPI = async ({ teamspeak } = {}) => (
  new Promise((resolve, reject) => {
    teamspeak.send('channellist', (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  })
);

export const createChannel = async ({ channel, teamspeak }) => (
  new Promise((resolve, reject) => {
    teamspeak.send('channelcreate', {
      channel_flag_permanent: 1,
      ...channel,
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          ...result,
          ...channel,
        });
      }
    });
  })
);

export const deleteChannel = async ({ cid, teamspeak }) => (
  new Promise((resolve, reject) => {
    teamspeak.send('channeldelete', { cid, force: 1 }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
);

export const updateChannel = async ({
  teamspeak,
  channelData,
}) => (
  new Promise((resolve, reject) => {
    teamspeak.send('channeledit', channelData, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  })
);

export const dragAllToChannel = async ({
  teamspeak,
  clientData,
}) => (
  new Promise((resolve, reject) => {
    teamspeak.send('clientmove', clientData, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  })
);
