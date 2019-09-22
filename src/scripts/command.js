import { canDo } from '../utils/permissions';
import ServerGroups from '../api/models/server-groups';
import { formatHelpMessage } from '../utils/help';
import { isUserServerAdmin } from './server-groups';
import { BOT_NAME, COMMANDS_MAP } from '../utils/constants';

const executeCommand = async (command, teamspeak, msgAsList, cid) => (
  new Promise(async (resolve, reject) => {
    const { exec } = COMMANDS_MAP[command];
    
    const { ok, message } = await exec(teamspeak, msgAsList, cid);

    if (!ok) {
      reject(message);
    }

    resolve(ok);
  })
);

export const proceesCommand = async (event = {}, teamspeak) => {
  const { msg, invoker } = event;
  const { propcache } = invoker;

  const { cid, client_nickname, client_servergroups } = propcache;

  try {
    if (client_nickname === BOT_NAME) return;

    const msgAsList = msg.split(' ');
  
    const command = msgAsList[0];
    
    const dbUserGroups = await ServerGroups.find({ sgid: { $in: client_servergroups } });

    if (command === '!help') {
      invoker.message(formatHelpMessage(dbUserGroups));
      return;
    }

    const { ok, message } = await canDo(command, dbUserGroups);
    
    const isServerAdmin = await isUserServerAdmin(teamspeak, client_servergroups);

    const continueWithAddingAdmins = (command === '!addNewAdmin' || command === '!addNewModerator') && isServerAdmin;
    
    if (!continueWithAddingAdmins && !ok) {
      return invoker.message(message);
    }
  
    await executeCommand(command, teamspeak, msgAsList, cid);
  
    return true;
  } catch (error) {
    invoker.message(error);
  }
};
