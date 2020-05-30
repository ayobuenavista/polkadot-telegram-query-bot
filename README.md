# polkadot-telegram-query-bot

Telegram bot that queries data from Polkadot. Uses the [Telegraf](https://github.com/telegraf/telegraf) Telegram bot framework.

Bots are special [Telegram](https://telegram.org) accounts designed to handle messages automatically.
Users can interact with bots by sending them command messages in private or group chats.

### Installation

```
$ npm install
```

### Setup

1) Create an .env file in the root directory, containing your node API key and Telegram bot token. Note: Omit the bot prefix in the Telegram token.

e.g.
```
NODE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_TOKEN=xxxxxxxxx:xxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxx
```

2) Edit the `rpcURL` in `./src/config/default.json` if you are using Infura or your own node.


### Running

To run in development mode (restarts at every file change)
```
npm run dev
```

To run in production mode
```
npm run start
```

### Bot Commands

Send the following commands directly to the bot or in a group where the bot is present.

 <!-- TODO: Fill out commands on README -->
