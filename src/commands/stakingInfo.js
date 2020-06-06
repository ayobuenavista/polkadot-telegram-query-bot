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
      `Sessions Per Era: \`${web3.consts.staking.sessionsPerEra.toNumber()}\`\n`,
      `Bonding Duration: \`${web3.consts.staking.bondingDuration.toNumber()} days\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};