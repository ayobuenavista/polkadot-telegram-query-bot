const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);

    let msg = '';
    msg = msg.concat(
      `Candidacy Bond: \`${web3.consts.electionsPhragmen.candidacyBond.toNumber()}\`\n`,
      `Voting Bond: \`${web3.consts.electionsPhragmen.votingBond.toNumber()}\`\n`,
      `Desired Members: \`${web3.consts.electionsPhragmen.desiredMembers.toNumber()}\`\n`,
      `Desired Runners Up: \`${web3.consts.electionsPhragmen.desiredRunnersUp.toNumber()}\`\n`,
      `Term Duration: \`${web3.consts.electionsPhragmen.termDuration.toNumber()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};