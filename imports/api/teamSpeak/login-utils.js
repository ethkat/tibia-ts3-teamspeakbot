import TeamSpeakClient from 'node-teamspeak-ethkat';

export const initTeamspeakClient = ({ port, botId, address }) => (
  new TeamSpeakClient(address, port, botId)
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
      if (error) reject(error);
      teamspeak.send('use', { sid }, async (errorUse) => {
        if (error) reject(errorUse);
        await updateNickname({ teamspeak });
        resolve(teamspeak);
      });
    });
  })
);
