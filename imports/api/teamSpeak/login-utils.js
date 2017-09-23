import TeamSpeakClient from 'node-teamspeak-ethkat';

import { mapTsError } from '/imports/api/teamSpeak/utils';

export const initTeamspeakClient = async ({ port, botId, address }) => (
  new Promise((resolve, reject) => {
    const ts3 = new TeamSpeakClient(address, port, botId);

    ts3.on('error', (error) => {
      reject(error);
    });

    ts3.on('connect', () => {
      resolve(ts3);
    });
  })
);

const BOT_NAME = 'ETHAN_TS3_BOT';

export const logoutFromServer = async ({ teamspeak }) => (
  new Promise((resolve) => {
    teamspeak.send('logout');
    resolve(true);
  })
);

const updateNickname = ({
  nickname = BOT_NAME,
  teamspeak,
}) => (
  new Promise((resolve) => {
    teamspeak.send('clientupdate', { client_nickname: nickname }, () => {
      resolve(teamspeak);
    });
  })
);

export const loginToServerQuery = async ({
  teamspeak,
  serverId: sid,
  username: client_login_name,
  password: client_login_password,
}) => (
  new Promise(async (resolve, reject) => {
    teamspeak.send('login', { client_login_name, client_login_password }, async function(error) {
      if (error) {
        reject(mapTsError({ error }));
      } else {
        teamspeak.send('use', { sid }, async (errorUse) => {
          if (errorUse) {
            reject(mapTsError({ error: errorUse }));
          } else {
            await updateNickname({ teamspeak });
            resolve(teamspeak);
          }
        });
      }
    });
  })
);
