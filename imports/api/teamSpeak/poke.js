import { mapTsError } from '/imports/api/teamSpeak/utils';

export const sendPoke = async ({ clid, message: msg, teamspeak }) => (
  new Promise((resolve, reject) => {
    teamspeak.send('clientpoke', {
      msg,
      clid,
    }, (error, result) => {
      if (error) {
        reject(mapTsError({ error }));
      } else {
        resolve(result);
      }
    });
  })
);
