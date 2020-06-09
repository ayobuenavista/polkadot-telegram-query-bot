const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);

    const [proposals] = await Promise.all([
      web3.query.council.proposals(),
    ]);

    if (proposals.length === 0) {
      replyWithMarkdown('No proposals returned', inReplyTo(message.message_id));
    }

    let msg = '';
    for (let i = 0; i < proposals.length; i++) {
      msg = msg.concat(`${i}] \`${proposals[i]}\`\n`);
    }

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};