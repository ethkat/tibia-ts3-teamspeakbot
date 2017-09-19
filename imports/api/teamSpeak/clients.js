export const getClientsList = async ({ teamspeak }) => (
  new Promise((resolve, reject) => {
    teamspeak.send('clientlist', (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
);

export const clientKick = async ({
  kickData,
  teamspeak,
}) => (
  new Promise((resolve, reject) => {
    teamspeak.send('clientkick', kickData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
);

export const kickBotClients = async ({ teamspeak }) => (
  new Promise(async (resolve) => {
    const users = await getClientsList({ teamspeak });
    const clientKicks = await Promise.all(
      users.map(({ clid, client_nickname }) => {
        if (client_nickname.indexOf('BOT') > -1) {
          clientKick({
            clid,
            teamspeak,
          });
        }
      }),
    );
    resolve(clientKicks);
  })
);

export const findClient = async ({ teamspeak, botName }) => (
  new Promise((resolve) => {
    teamspeak.send('clientfind', {
      pattern: botName,
    }, (error, result) => {
      resolve(result);
    });
  })
);
