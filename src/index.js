const Extra = require('telegraf/extra');
const logger = require('./logger');
const app = require('./app');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

app.catch(err => {
  logger.error(err);
});

let help = '';
help = help.concat(
  'I can query Polkadot blockchain data for you.\n\n',
  'You can control me by sending these commands:\n\n',
  'TODO', // TODO: Fill out commands
);
app.help(ctx => {
  ctx.replyWithMarkdown(
    help,
    Extra.inReplyTo(ctx.message.message_id),
  );
});

app.startPolling();
logger.info('- TELEGRAM BOT STARTED -');
