import _ from 'lodash';
import { VOCATIONS_ICONS } from '/imports/utils/constants';

export const sortByProfessions = ({ items }) => {
  const sorting = [
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

  return items.sort((a, b) => (
    sorting.indexOf(a.vocation) < sorting.indexOf(b.vocation) ? -1 : 1
  ));
};

export const getVocationIcon = ({ vocation }) => {
  const iconUrl = _.findKey(VOCATIONS_ICONS, voc => vocation.indexOf(voc) > -1);
  return `[IMG]${iconUrl}[/IMG]`;
};

export const buildCharacterDescription = ({ item }) => {
  const { name, vocation, level } = item;

  let vocationCustom = vocation;
  if (!vocationCustom) {
    vocationCustom = item.profession;
  }

  return `${getVocationIcon({ vocation: vocationCustom })} ${name} - ${vocationCustom} - ${level} \n`;
};
