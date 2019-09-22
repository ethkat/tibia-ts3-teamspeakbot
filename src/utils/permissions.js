import { COMMANDS_MAP } from './constants';

export const canDo = async (command, dbUserGroups = []) => {
  const getCommandData = COMMANDS_MAP[command];

  if (!getCommandData) {
    return { ok: false, message: `${command} command is not supported` };
  }

  const { groups } = getCommandData;
    
  let canExecuteCommandFromServerGroup = false;

  dbUserGroups.forEach(({ name }) => {
    if (groups.includes(name)) {
      canExecuteCommandFromServerGroup = true;
    }
  });

  if (!canExecuteCommandFromServerGroup) {
    return { ok: false, message: 'You don"t have permissions' };
  }

  return {
    ok: true,
    message: '',
  };
};
