## TS3 BOT for tibia RL server(s)

Before reading this, make sure you complete the steps from `SETUP_0.md` and `SETUP_1.md`.

## Availables Commands

You can type `!help` on the bot private message to get all the messages you have permissions to execute, or simply reference this documentation.

`!mk` - Mass kick, you can use it like `!mk ${message}` where `${message}` can be any message you want to sent to the kicked users.

`!mp` - Mass Poke, you can use it like `!mp ${message}` where `${message}` can be any message you want to sent to all the users.

`!mmove` - Mass Move, you can use it like `!mmove` this will move all the connected clients to the channel where you execute the command.

`!addEnemy` - Add Enemy, you can use it like, `!addEnemy ${characterName}` where `${characterName}` is the character to add into that list

`!addEnemysByGuild` - **(experimental)** Add Enemy(s), you can use it like, `!addEnemysByGuild ${guildName}` where `${guildName}` is the guild name you want to add, beware using this, it can skip some players with special characters or titles.

`!removeEnemy` - Remove Enemy, you can use it like, `!removeEnemy ${characterName}` where `${characterName}` is the character to remove from the list.

`!addFriend` - Add Enemy, you can use it like, `!addFriend ${characterName}` where `${characterName}` is the character to add into that list

`!addFriendsByGuild` - **(experimental)** Add Friend(s) by guild URL, you can use it like, `!addFriendsByGuild ${guildName}` where `${guildName}` is the guild name you want to add, beware using this, it can skip some players with special characters or titles.

`!removeFriend` - Remove Friend, you can use it like, `!removeFriend ${characterName}` where `${characterName}` is the character to add into that list

`!addNeutral` - Add Neutral, you can use it like, `!addNeutral ${characterName}` where `${characterName}` is the character to add into that list

`!removeNeutral` - Remove Neutral, you can use it like, `!removeNeutral ${characterName}` where `${characterName}` is the character to add into that list

`!addMakersEnemy` - Add Enemy Maker, you can use it like, `!addMakersEnemy ${characterName}` where `${characterName}` is the character to add into that list

`!removeMakersEnemy` - Remove Enemy Namers, you can use it like, `!removeMakersEnemy ${characterName}` where `${characterName}` is the character to add into that list

`!addMakersFriend` - Add Friend Makers, you can use it like, `!addMakersFriend ${characterName}` where `${characterName}` is the character to add into that list

`!addPossibleEnemys` - Add Possible Enemys, you can use it like, `!addPossibleEnemys ${characterName}` where `${characterName}` is the character to add into that list

`!removePossibleEnemys` - Remove Possible Enemys, you can use it like, `!removePossibleEnemys ${characterName}` where `${characterName}` is the character to add into that list

`!addNewAdmin` - Add new admin to the TS Bot server group, you can use it like `!addNewAdmin ${username}`, where username is the connected username on the TS

`!removeAdmin` - Remove admin to the TS Bot server group, you can use it like `!removeAdmin ${username}`, where `${username}` is the connected username on the TS

`!addNewModerator` - Add Moderator To the TS BOT Server group, you can use it like, `!addNewModerator ${username}` where `${username}` is the connected username on the TS

`!removeModerator` - Remove Moderator To the TS BOT Server group, you can use it like, `!removeModerator ${username}` where `${username}` is the connected username on the TS

## IMPORTANT NOTES

1.- Dont delete the channel with the name of the bot (see src/utils/constants.js), because there is a chance this will break the relationship between DB and TS, if you do that, you will need to start from scratch again.

2.- There is a know bug on the parser for the command addEnemysByGuild and addFriendsByGuild, where some character are not added, this just happend in weird scenarios where there is an spceial rank on the guild, and is really hard or complex to get them,

