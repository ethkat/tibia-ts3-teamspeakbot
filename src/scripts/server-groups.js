import ServerGroups, { insertServerGroup } from '../api/models/server-groups';
import { ADMIN_GROUP_NAME, MODERATOR_GROUP_NAME } from '../utils/constants';

export const isUserServerAdmin = async (teamspeak, clientServerGroups = []) => (
  new Promise(async (resolve, reject) => {
    try {
      
      const serverGroupsNameOfUser = await Promise.all(clientServerGroups.map((serverGroupId) => (
        new Promise(async (resolve, reject) => {
          try {
            const serverGroup = await teamspeak.getServerGroupByID(serverGroupId);
            
            if (!serverGroup) resolve('');

            const { propcache } = serverGroup;
            const { name } = propcache;

            resolve(name);
          } catch (error) {
            reject(error);
          }
        })
      )));

      resolve(serverGroupsNameOfUser.includes('Server Admin'));
    } catch (error) {
      reject(error);
    }
  })
);

export const promoteUser = async (teamspeak, username, name, type = 'add') => (
  new Promise(async (resolve, reject) => {
    try {
      const serverGroup = await ServerGroups.findOne({ name });
      
      if (!serverGroup) resolve();

      const { sgid } = serverGroup;

      const client = await teamspeak.getClientByName(username);

      if (!client) resolve();

      const { propcache: clientPropcache } = client;
      const { client_database_id } = clientPropcache;

      if (type === 'add') {
        await teamspeak.serverGroupAddClient(client_database_id, sgid);
      } else {
        await teamspeak.serverGroupDelClient(client_database_id, sgid);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export const createServerGroups = async (spinner, teamspeak) => (
  new Promise(async (resolve, reject) => {
    try {
      spinner.text = 'Creating Server Groups';

      await teamspeak.serverGroupCreate(MODERATOR_GROUP_NAME, 1);
      await teamspeak.serverGroupCreate(ADMIN_GROUP_NAME, 1);

      const {
        propcache: { sgid: serverGroupIdAdmin }
      } = await teamspeak.getServerGroupByName(ADMIN_GROUP_NAME);
      const {
        propcache: { sgid: serverGroupIdModerator }
      } = await teamspeak.getServerGroupByName(MODERATOR_GROUP_NAME);
      
      const { client_id } = await teamspeak.whoami();

      await teamspeak.serverGroupAddClient(client_id, serverGroupIdAdmin);
      await teamspeak.serverGroupAddClient(client_id, serverGroupIdModerator);
      
      await insertServerGroup({ sgid: serverGroupIdAdmin, name: ADMIN_GROUP_NAME });
      await insertServerGroup({ sgid: serverGroupIdModerator, name: MODERATOR_GROUP_NAME });

      resolve();
    } catch (error) {
      reject(error);
    }
  })
);
