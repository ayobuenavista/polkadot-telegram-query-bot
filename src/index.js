const Extra = require('telegraf/extra');
const logger = require('./logger');
const bot = require('./app');

process.on('unhandledRejection', (reason, p) => 
  logger.error(`Unhandled Rejection at: Promise ${p}. ${reason}`)
);

async function main() {
  const app = await bot();

  app.telegram.getMe().then(info => {
    app.options.username = info.username;
  });
  
  app.catch(err => {
    logger.error(err);
  });
  
  let help = '';
  help = help.concat(
    'I can query Polkadot and other Substrate chain data for you.\n',
    '(only Polkadot and Kusama suported for now, with Polkadot queried as default)\n\n',
    'You can send these commands to query information from a Subtrate chain:\n\n',
    '`Returns the balance of an account`\n',
    '/balance <accountId> <optional: chain>\n\n',
    '`Returns basic information of the Substrate chain`\n',
    '/chainInfo <optional: chain>\n\n',
    '`Returns council information`\n',
    '/councilInfo <optional: chain>\n\n',
    '`Returns democracy information`\n',
    '/democracyInfo <optional: chain>\n\n',
    '`Returns elections information`\n',
    '/electionsInfo <optional: chain>\n\n',
    '`Returns elections information`\n',
    '/electionsInfo <optional: chain>\n\n',
    '`Returns a range of validators that indicate their intention to validate (e.g. range: 0-10)`\n',
    '/intentions <range> <optional: chain>\n\n',
    '`Returns the latest block information`\n',
    '/latestBlock <optional: chain>\n\n',
    '`Returns the information of a proposal by providing the proposal hash`\n',
    '/proposalInfo <hash> <optional: chain>\n\n',
    '`Returns the list of proposals`\n',
    '/proposals <optional: chain>\n\n',
    '`Returns the runtime constant values`\n',
    '/runtimeConstants <optional: chain>\n\n',
    '`Returns the staking information`\n',
    '/stakingInfo <optional: chain>\n\n',
    '`Returns the technical committee information`\n',
    '/techComm <optional: chain>\n\n',
    '`Returns the information of a technical committee proposal by providing the proposal hash`\n',
    '/techCommProposalInfo <hash> <optional: chain>\n\n',
    '`Returns the list of technical committee proposals`\n',
    '/techCommProposals <optional: chain>\n\n',
    '`Returns a range of active validators (e.g. range: 0-10)`\n',
    '/validators <range> <optional: chain>\n\n',
  );
  app.help(ctx => {
    ctx.replyWithMarkdown(
      help,
      Extra.inReplyTo(ctx.message.message_id),
    );
  });
  
  app.startPolling();
  logger.info('- TELEGRAM BOT STARTED -');
}

main();
