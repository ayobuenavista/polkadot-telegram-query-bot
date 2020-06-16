# Polkadot Telegram Query Bot

Telegram bot that queries data from Polkadot other Substrate-based chain data. Uses the [Telegraf](https://github.com/telegraf/telegraf) Telegram bot framework. Bots are special [Telegram](https://telegram.org) accounts designed to handle messages automatically.
Users can interact with bots by sending them command messages in private or group chats.

Built as part of the [**Build Polkadot bounty challenges**](https://github.com/Web3Foundation/build-polkadot/issues/1), sponsored by the Web3 Foundation, under the **Build Polkadot Challenge 2: User Tools** category.

### Installation

```
$ npm install
```

### Setup

1) Create an .env file in the root directory, containing your Telegram bot token. Note: Omit the bot prefix in the Telegram token.

e.g.
```
TELEGRAM_TOKEN=xxxxxxxxx:xxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxx
```

2) Edit the `node` URIs in `./src/config/default.json` to add in your node or node provider..


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

Note: For chain support, only Polkadot and Kusama suported for now, with Polkadot queried as default.

You can send these commands to query information from a Subtrate chain:

**Returns the balance of an account**
```
/balance <accountId> <optional: chain>
```

**Returns the block info at the provided height**
```
/blockInfo <height> <optional: chain>
```

**Returns basic information of the Substrate chain**
```
/chainInfo <optional: chain>
```

**Returns council information**
```
/councilInfo <optional: chain>
```

**Returns democracy information**
```
/democracyInfo <optional: chain>
```

**Returns elections information**
```
/electionsInfo <optional: chain>
```

**Returns the number of validators waiting to validate**
```
/intentionCount <optional: chain>
```

**Returns a range of validators that indicate their intention to validate (e.g. range: 0-10)**
```
/intentions <range> <optional: chain>
```

**Returns the latest block information**
```
/latestBlock <optional: chain>
```

**Returns the information of a proposal by providing the proposal hash**
```
/proposalInfo <hash> <optional: chain>
```

**Returns the list of proposals**
```
/proposals <optional: chain>
```

**Returns the runtime constant values**
```
/runtimeConstants <optional: chain>
```

**Returns the staking information**
```
/stakingInfo <optional: chain>
```

**Returns the sudo key accountId**
```
/sudoKey <optional: chain>
```

**Returns the technical committee information**
```
/techComm <optional: chain>
```

**Returns the information of a technical committee proposal by providing the proposal hash**
```
/techCommProposalInfo <hash> <optional: chain>
```

**Returns the list of technical committee proposals**
```
/techCommProposals <optional: chain>
```

**Returns the number of active validators**
```
/validatorCount <optional: chain>
```

**Returns a range of active validators (e.g. range: 0-10)**
```
/validators <range> <optional: chain>
```

#### Examples

**To get balance information of an account:**
```
/balance 1KvKReVmUiTc2LW2a4qyHsaJJ9eE9LRsywZkMk5hyBeyHgw

Output:
Total: 999.973 DOT
Bonded: 0
```

**To get the first 5 active validators in kusama:**
```
/validators 0-5 kusama

Output:
0] Gt6HqWBhdu4Sy1u8ASTbS1qf2Ac5gwdegwr8tWN8saMxPt5
Staked: 6.440k KSM
Commission: 0.00%
Online: false

1] EXkCSUQ6Z1hKvGWMNkUDKrTMVHRduQHWc8G6vgo4NccUmhU
Staked: 1.441k KSM
Commission: 100.00%
Online: false

2] EZ7uBY7ZLohavWAugjTSUVVSABLfad77S6RQf4pDe3cV9q4
Staked: 7.999 KSM
Commission: 100.00%
Online: true

3] FDGCEYyHNh7u5Wx5UbC98aHXeaJ7J4TwQPK8YtEQPTjp1Cz
Staked: 10.002 KSM
Commission: 100.00%
Online: false

4] Etij9aH36W1NjjWbR7wB5j41CmfpqAx8D4V4HCJhUydSH9Y
Staked: 813.302 KSM
Commission: 6.00%
Online: false

5] Eodfj4xjkw8ZFLLSS5RfP6vCMw8aM6qfM7BfeQMf6ivFWHy
Staked: 9.002 KSM
Commission: 100.00%
Online: true
```

**Get the council information in Polkadot:**
```
/councilInfo

Output:
Prime: None
Proposal Count: 0
Members: None
```

**Get the council information in Kusama:**
```
/councilInfo kusama

Output:
Prime: GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj
Proposal Count: 154
Members:
0] DMF8a34emwapz9mV5P5PTDcghh1ZR3miH9ad9mHzfAUMSXU
1] DTLcUu92NoQw4gg6VmNgXeYQiNywDhfYMQBPYg2Y1W6AkJF
2] DWUAQt9zcpnQt5dT48NwWbJuxQ78vKRK9PRkHDkGDn9TJ1j
3] DfiSM1qqP11ECaekbA64L2ENcsWEpGk8df8wf1LAfV2sBd4
4] EDkyLR1J19e9agASF6PK649jiheqD95tRweFNyzTg11Xug4
5] FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL
6] GLVeryFRbg5hEKvQZcAnLvXZEXhiYaBjzSDwrXBXrfPF7wj
7] GcqKn3HHodwcFc3Pg3Evcbc43m7qJNMiMv744e5WMSS7TGn
8] Gth5jQA6v9EFbpqSPgXcsvpGSrbTdWwmBADnqa36ptjs5m5
9] GvyfytrxFQbHK8ZFNT3h12dJPfBXFjVV7k98cXni8VAgjKX
10] H9eSvWe34vQDJAWckeTHWSqSChRat8bgKHG39GC1fjvEm7y
11] HSNBs8VHxcZiqz9NfSQq2YaznTa8BzSvuEWVe4uTihcGiQN
12] J9nD3s7zssCX7bion1xctAF6xcVexcpy2uwy4jTm9JL8yuK
```

### Deployed Test Version

A live version of the bot is running. Search for [@polkadot_query_bot](https://t.me/polkadot_query_bot) in Telegram. Please note that the test bot is hosted in free tier AWS hosting, so performance is subpar, and no data servicing optimizations has been done.
