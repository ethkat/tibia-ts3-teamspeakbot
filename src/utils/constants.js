import { promoteUser } from '../scripts/server-groups';
import { massKick, massMove, sendMassPoke } from '../scripts/client';
import { insertCharacter, removeCharacter, addCharactersByGuildName } from '../api/models/characters';

export const ADMIN_GROUP_NAME = 'Bot Admin';
export const MODERATOR_GROUP_NAME = 'Bot Moderator';

export const BOT_NAME = 'FreeBot';

export const VOCATIONS_ICONS = {
  'http://forums.xenobot.net/images/icons/icon4.png': 'None',
  'http://i.imgur.com/qAXsL2J.png': 'Druid',
  'http://i.imgur.com/rYWmtmw.png': 'Paladin',
  'http://i.imgur.com/jMWSztQ.png': 'Sorcerer',
  'http://i.imgur.com/sKqEwqU.png': 'Knight',
};

export const INITIAL_CHANNELS = [{
  type: 'spacer',
  name: '[*cspacer]▂',
}, {
  type: 'spacer',
  name: '[cspacer]* * * Tibia TS BOT * * *',
}, {
  type: 'spacer',
  name: '[*cspacer]▂▂',
}, {
  type: 'help',
  name: '[cspacer]Help channel',
  description: 'Send !help to see all the availables commands',
}, {
  type: 'spacer',
  name: '[*cspacer]▂▂▂▂▂▂',
},{
  type: 'enemy',
  name: '[cspacer]Enemys (0/0)',
}, {
  type: 'makersEnemy',
  name: '[cspacer]Enemy makers (0/0)',
}, {
  type: 'friend',
  name: '[cspacer]Friends (0/0)',
}, {
  type: 'neutral',
  name: '[cspacer]Neutrals (0/0)',
}, {
  type: 'makersFriend',
  name: '[cspacer]Friend makers (0/0)',
}, {
  type: 'possibleEnemys',
  name: '[cspacer]Possible Enemys (0/0)',
}, {
  type: 'spacer',
  name: '[*cspacer]▂▂▂▂',
}];

export const VOCATIONS = [
  'Master Sorcerer',
  'Sorcerer',
  'Elite Knight',
  'Knight',
  'Elder Druid',
  'Druid',
  'Royal Paladin',
  'Paladin',
  'None',
];

export const COMMANDS_MAP = {
  '!mk': {
    groups: [MODERATOR_GROUP_NAME, ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const message = msgAsList.join(' ');
        await massKick(teamspeak, message);
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!mk ${message}, kick clients with optional message',
  },
  '!mp': {
    groups: [MODERATOR_GROUP_NAME, ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const message = msgAsList.join(' ');
        await sendMassPoke(teamspeak, message);
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!mp ${message}, to sent a poke to all connected clients',
  },
  '!mmove': {
    groups: [MODERATOR_GROUP_NAME, ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList, cid) => {
      try {
        await massMove(teamspeak, cid, msgAsList[1]);
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!mmove ${cpw}, just move to the channel you want to move all, and execute note: pass cpw when try to move to a private channel',
  },
  '!addEnemy': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'enemy' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addEnemy ${enemyName}',
  },
  '!addEnemysByGuild': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (_, msgAsList) => {
      try {
        msgAsList.shift();
        const message = msgAsList.join(' ');
        await addCharactersByGuildName(message, 'enemy');
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addEnemysByGuild ${guildName}',
  },
  '!removeEnemy': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'enemy' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeEnemy ${enemyName}',
  },
  '!addFriend': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'friend' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addFriend ${enemyName}',
  },
  '!addFriendsByGuild': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const message = msgAsList.join(' ');
        await addCharactersByGuildName(message, 'friend');
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addFriendsByGuild ${guildName}',
  },
  '!removeFriend': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'friend' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeFriend ${enemyName}',
  },
  '!addNeutral': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'neutral' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addNeutral ${enemyName}',
  },
  '!removeNeutral': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'neutral' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeNeutral ${enemyName}',
  },
  '!addMakersEnemy': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'makersEnemy' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addMakersEnemy ${enemyName}',
  },
  '!removeMakersEnemy': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'makersEnemy' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeMakersEnemy ${enemyName}',
  },
  '!addMakersFriend': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'makersFriend' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addMakersFriend ${enemyName}',
  },
  '!removeMakersFriend': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'makersFriend' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeMakersFriend ${enemyName}',
  },
  '!addPossibleEnemys': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await insertCharacter({ characterName, type: 'possibleEnemys' }, teamspeak);

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addPossibleEnemys ${enemyName}',
  },
  '!removePossibleEnemys': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const characterName = msgAsList.join(' ');

        await removeCharacter({ characterName, type: 'possibleEnemys' });

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removePossibleEnemys ${enemyName}',
  },
  '!addNewAdmin': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const username = msgAsList.join(' ');

        await promoteUser(teamspeak, username, 'Bot Admin');

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addNewAdmin ${username}',
  },
  '!removeAdmin': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const username = msgAsList.join(' ');

        await promoteUser(teamspeak, username, 'Bot Admin', 'remove');

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeModerator ${username}',
  },
  '!addNewModerator': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const username = msgAsList.join(' ');

        await promoteUser(teamspeak, username, 'Bot Moderator');

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!addNewModerator ${username}',
  },
  '!removeModerator': {
    groups: [ADMIN_GROUP_NAME],
    exec: async (teamspeak, msgAsList) => {
      try {
        msgAsList.shift();
        const username = msgAsList.join(' ');

        await promoteUser(teamspeak, username, 'Bot Moderator', 'remove');

        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
      }
    },
    howToUse: '!removeModerator ${username}',
  },
};
