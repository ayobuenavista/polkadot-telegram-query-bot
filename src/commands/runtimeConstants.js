const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = helpers.getWeb3(network);

    let msg = '';
    msg = msg.concat(
      `Epoch Duration: \`${web3.consts.babe.epochDuration.toNumber()}\`\n`,
      `Expected Block Time: \`${web3.consts.babe.expectedBlockTime.toNumber()}\`\n`,
      `Extrinsic Fee Per Byte: \`${web3.consts.transactionPayment.transactionByteFee.toNumber()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};