## Getting Started

On this step, we will Download the code and run the setup scripts, be sure to complete all the steps of `SETUP_0.md`

Remember, all this steps should be done inside the computer where the TS3 is running, a remote server, or your own computer, this will connect to the localserver.

### Cloning the project

On the console run `git clone https://github.com/ethkat/tibia-ts3-teamspeakbot.git` and thats it.

More about [cloning a github project](https://help.github.com/en/articles/cloning-a-repository)

### Positioning and setup

Now you need to be on the current working directory of the project you just clone, you can get there by doing `cd tibia-ts3-teamspeakbot`.

Now that you are there, the first thing you need to run is `yarn ts3-setup`, this will create all the neccesary channels, servergroups and start the correct `meta` on the DB, if all goes OK you should get a green `done` message on the console.

After that, now you can run `yarn ts3-start` and i will start the bot.


### Enviroment

now to finish the setup, you need to create an `.env` file in the root of the project, you can (if on MacOS) run `touch .env`, after creating the file,you need to put the next content inside.

```
HOST=127.0.0.1
PASSWORD=xxxx
LOGIN_NAME=serveradmin
MONGO_URL=mongodb://localhost:27017
QUERY_PORT=10011
MONGO_DB_NAME=bot
SERVER_PORT=9987
WORLD_NAME=Funera
```

Each variable is very explanatory by itself, it points to the local mongodb instance, to the game world you want this bot to point, `LOGIN_NAME` `PASSWORD` `HOST` is information you should have about your bot.