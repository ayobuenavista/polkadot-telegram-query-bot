const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const chain = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);

    let msg = '';
    msg = msg.concat(
      `Epoch Duration: \`${web3.consts.babe.epochDuration.toHuman()}\`\n`,
      `Expected Block Time: \`${web3.consts.babe.expectedBlockTime.toHuman()}\`\n`,
      `Extrinsic Fee Per Byte: \`${web3.consts.transactionPayment.transactionByteFee.toHuman()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};