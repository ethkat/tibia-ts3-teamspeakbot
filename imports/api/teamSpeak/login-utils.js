import TeamSpeakClient from 'node-teamspeak';

export const initTeamspeakClient = ({ port, address }) => new TeamSpeakClient(address, port);

const updateNickname = ({
  nickname = 'ETHAN_TS3_BOT',
  teamspeak,
}) => (
  new Promise(async (resolve, reject) => {
    teamspeak.send('clientupdate', { client_nickname: nickname }, (error) => {
      if (error) {
        const { msg } = error;
        if (msg === 'nickname is already in use' && nickname === 'ETHAN_TS3_BOT') {
          updateNickname({
            nickname: 'ETHAN_BOT_TS3',
          });
        } else if (msg === 'nickname is already in use' && nickname === 'ETHAN_BOT_TS3') {
          resolve(teamspeak);
        } else {
          reject(error);
        }
      } else {
        resolve(teamspeak);
      }
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
    teamspeak.send('login', { client_login_name, client_login_password }, async (error) => {
      if (error) reject(error);
      teamspeak.send('use', { sid }, async (errorUse) => {
        if (error) reject(errorUse);
        await updateNickname({ teamspeak });

        resolve(teamspeak);
      });
    });
  })
);

export const logoutFromServer = async ({ teamspeak }) => (
  new Promise((resolve) => {
    teamspeak.send('logout');
    resolve(true);
  })
);
