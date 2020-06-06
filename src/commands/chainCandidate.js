const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = helpers.getWeb3(network);

    replyWithMarkdown(`*${await web3.rpc.system.chain()}*`, inReplyTo(message.message_id));
  };
};