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
      `Candidacy Bond: \`${web3.consts.electionsPhragmen.candidacyBond.toHuman()}\`\n`,
      `Voting Bond: \`${web3.consts.electionsPhragmen.votingBond.toHuman()}\`\n`,
      `Desired Members: \`${web3.consts.electionsPhragmen.desiredMembers.toHuman()}\`\n`,
      `Desired Runners Up: \`${web3.consts.electionsPhragmen.desiredRunnersUp.toHuman()}\`\n`,
      `Term Duration: \`${web3.consts.electionsPhragmen.termDuration.toHuman()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};