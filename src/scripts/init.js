import { BOT_NAME } from '../utils/constants';
import { TeamSpeak } from 'ts3-nodejs-library';
import { startTasks } from '../api/crone/lists';
import { proceesCommand } from '../scripts/command';
import { sendJoinMessage } from '../scripts/client';

const { HOST, QUERY_PORT, PASSWORD, SERVER_PORT, LOGIN_NAME } = process.env;

export default async (props = {}) => {
  return new Promise((resolve, reject) => {
    const teamspeak = new TeamSpeak({
      host: HOST,
      username: LOGIN_NAME,
      password: PASSWORD,
      nickname: BOT_NAME,
      protocol: 'raw',
      queryport: QUERY_PORT,
      serverport: SERVER_PORT,
      ...props,
    });
    
    teamspeak.on('textmessage', event => proceesCommand(event, teamspeak));
    teamspeak.on('clientconnect', sendJoinMessage);
  
    teamspeak.on('ready', async () => {
      await teamspeak.registerEvent('textprivate');
      teamspeak.registerEvent('server');
      teamspeak.registerEvent('channel', 0);

      startTasks(teamspeak);
      resolve(teamspeak);
    });
    
    teamspeak.on('error', (error) => {
      reject(error);
    });
  });
};
