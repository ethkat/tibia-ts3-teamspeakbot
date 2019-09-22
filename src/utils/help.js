import { COMMANDS_MAP } from './constants';

export const formatHelpMessage = (dbUserGroups = []) => {
  let response = '\n Current availables commands: \n';
  
  const availablesCommands = Object.values(COMMANDS_MAP);
  availablesCommands.forEach(({ groups, howToUse }) => {
    let isVisibleByGroup = false;

    dbUserGroups.forEach(({ name }) => {
      if (groups.includes(name)) {
        isVisibleByGroup = true;
      }
    });

    if (howToUse && isVisibleByGroup) {
      response += `${howToUse} \n`;
    }
  });

  return response;
};