import cron from 'node-cron';
import moment from 'moment';
import { findKey } from 'lodash';
import { capitalize } from 'lodash';
import TibiaAPI from '../tibia';
import Characters from '../models/characters';
import Meta, { updateMeta } from '../models/meta';
import { sendMassPoke } from '../../scripts/client';
import { updateChannel } from '../../scripts/channels';
import { VOCATIONS_ICONS } from '../../utils/constants';

const { WORLD_NAME } = process.env;

const tibiaAPI = new TibiaAPI({ worldName: WORLD_NAME });

const sortByProfessions = ({ online: onlineCharacters, dbCharacters }) => {
  const sorcerers = onlineCharacters.filter(({ vocation }) => (
    vocation === 'Master Sorcerer' || vocation === 'Sorcerer'
  ));

  const druids = onlineCharacters.filter(({ vocation }) => (
    vocation === 'Elder Druid' || vocation === 'Druid'
  ));

  const paladins = onlineCharacters.filter(({ vocation }) => (
    vocation === 'Royal Paladin' || vocation === 'Paladin'
  ));

  const knights = onlineCharacters.filter(({ vocation }) => (
    vocation === 'Elite Knight' || vocation === 'Knight'
  ));

  const nons = onlineCharacters.filter(({ vocation }) => vocation === 'None');

  return {
    online: [
      ...sorcerers,
      ...druids,
      ...paladins,
      ...knights,
      ...nons,
    ],
    dbCharacters
  };
};

const getInformationFromCharacters = async (characterNames = []) => (
  new Promise(async (resolve, reject) => {
    try {
      const playersOnline = await tibiaAPI.getOnlinePlayers();
      const characterInformations = await Promise.all(characterNames.map(({
        type,
        characterName,
      }) => (
        new Promise(async (resolve) => {
          try {
            const information = playersOnline.find(({ name }) => name === characterName);

            if (information && information.kills) {
              information.kills.forEach((death) => {
                death.type = type;
              });
            }

            resolve(information);
          } catch (error) {
            resolve();
          }
        })
      )));
      resolve(characterInformations.filter((info) => info));
    } catch (error) {
      reject(error);
    }
  })
);

const getVocationIcon = ({ vocation }) => {
  const iconUrl = findKey(VOCATIONS_ICONS, voc => vocation.indexOf(voc) > -1);
  return `[IMG]${iconUrl}[/IMG]`;
};

const buildCharacterDescription = ({ name, vocation, level }) => (
  `${getVocationIcon({ vocation })} ${name} - ${vocation} - ${level} \n`
);

const generateDescription = (data = {}) => {
  let description = '\n';

  const { online, dbCharacters } = data;
  online.forEach((character) => {
    description += buildCharacterDescription(character);
  });

  return {
    online,
    description,
    dbCharacters,
  };
};

const getOnlineCharacters = (onlineCharacters = [], dbCharacters = []) => {
  const online = [];

  onlineCharacters.forEach((onlineCharacter) => {
    dbCharacters.forEach(({ characterName }) => {
      if (characterName === onlineCharacter.name) {
        online.push(onlineCharacter);
      }
    });
  });

  return { online, dbCharacters };
};

const getNotPokedKills = async (kills = []) => (
  new Promise(async (resolve, reject) => {
    try {
      const queryMeta = await Meta.findOne();

      const { lastCheck } = queryMeta;
      const lastCheckMoment = moment(lastCheck);
    
      const killsToPoke = kills.map(({ type, name, killedBy, timeAgo }) => {
        const isNewKill = lastCheckMoment.isSameOrAfter(moment(timeAgo));
        
        if (isNewKill) return `${capitalize(type)} ${capitalize(name)} Killed ${killedBy}`;
        return '';
      });
      resolve(killsToPoke);
    } catch (error) {
      reject(error);
    }
  })
);

const mapCharactersToNames = ({ type, characterName }) => ({ type, characterName });

export const startTasks = (teamspeak) => {
  const listTask = cron.schedule('0-59/2 * * * * *', async () => {
    const enemyCharacters = await Characters.find({ type: 'enemy' });
    const friendCharacters = await Characters.find({ type: 'friend' });
    const neutralCharacters = await Characters.find({ type: 'neutral' });
    const makersEnemyCharacters = await Characters.find({ type: 'makersEnemy' });
    const makersFriendCharacters = await Characters.find({ type: 'makersFriend' });
    const possibleEnemysCharacters = await Characters.find({ type: 'possibleEnemys' });

    const allCharacters = [
      ...enemyCharacters.map(mapCharactersToNames),
      ...friendCharacters.map(mapCharactersToNames),
      ...neutralCharacters.map(mapCharactersToNames),
      ...makersEnemyCharacters.map(mapCharactersToNames),
      ...makersFriendCharacters.map(mapCharactersToNames),
      ...possibleEnemysCharacters.map(mapCharactersToNames),
    ].filter(({ characterName }) => characterName);

    const allCharactersInformation = await getInformationFromCharacters(allCharacters);

    const deathListByCharacters = [];
    const playersOnline = [];

    if (allCharactersInformation && allCharactersInformation.length > 0) {

      allCharactersInformation.forEach((data) => {
        // TODO fix this
        // if (data && data.kills) {
        // deathListByCharacters.push(...data.kills);
        // }
  
        playersOnline.push(data);
      });
    }

    const enemyOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, enemyCharacters)));
    const friendOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, friendCharacters)));
    const neutralOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, neutralCharacters)));
    const makersOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, makersEnemyCharacters)));
    const makersFriendOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, makersFriendCharacters)));
    const possibleOnlineOfflineData = generateDescription(sortByProfessions(getOnlineCharacters(playersOnline, possibleEnemysCharacters)));
  
    const channelLists = await teamspeak.channelList();

    const channelListsName = channelLists.map(({ propcache }) => propcache.channel_name);

    await updateChannel(teamspeak, 'enemy', enemyOnlineOfflineData, channelListsName);
    await updateChannel(teamspeak, 'friend', friendOnlineOfflineData, channelListsName);
    await updateChannel(teamspeak, 'neutral', neutralOnlineOfflineData, channelListsName);
    await updateChannel(teamspeak, 'makersEnemy', makersOnlineOfflineData, channelListsName);
    await updateChannel(teamspeak, 'makersFriend', makersFriendOnlineOfflineData, channelListsName);
    await updateChannel(teamspeak, 'possibleEnemys', possibleOnlineOfflineData, channelListsName);

    const killsToPoke = await getNotPokedKills(deathListByCharacters.filter((character) => character.length));
 
    await Promise.all(killsToPoke.map((message) => (
      new Promise(async (resolve, reject) => {
        try {
          await sendMassPoke(teamspeak, `${message.substring(0, 97)}...`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
    )));

    await updateMeta();

  }, {
    scheduled: false,
  });

  listTask.start();
};
