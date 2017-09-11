import net from 'net';
import TeamSpeakClient from 'node-teamspeak';

export const initTeamspeakClient = ({ port, address }) => new TeamSpeakClient(address, port);

export const loginToServerQuery = async ({
  teamspeak,
  serverId: sid,
  username: client_login_name,
  password: client_login_password,
}) => (
  new Promise((resolve, reject) => {
    teamspeak.send('login', { client_login_name, client_login_password }, (error) => {
      if (error) reject(error);
      teamspeak.send('use', { sid }, (errorUse) => {
        if (error) reject(errorUse);
        teamspeak.send('clientupdate', { client_nickname: 'ETHAN_BOT' });
        resolve(teamspeak);
      });
    });
  })
);
