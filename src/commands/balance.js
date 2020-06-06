const Extra = require('telegraf/extra');
const utils = require('@polkadot/util-crypto');

module.exports = () => {
  return async ctx => {
    const { helpers, message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { args } = state.command;

    if (args.length < 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of required 1 provided.`
      );
      return;
    }

    const network = args[1] ? args[1].toLowerCase() : 'polkadot';
    const web3 = helpers.getWeb3(network);
    const address = args[0];
    const { data: balance } = await web3.query.system.account(address);

    replyWithMarkdown(`*${balance}*`, inReplyTo(message.message_id));
  };
};
