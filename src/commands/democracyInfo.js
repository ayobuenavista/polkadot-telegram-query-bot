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
      `Enactment Period: \`${web3.consts.democracy.enactmentPeriod.toHuman()}\`\n`,
      `Launch Period: \`${web3.consts.democracy.launchPeriod.toHuman()}\`\n`,
      `Voting Period: \`${web3.consts.democracy.votingPeriod.toHuman()}\`\n`,
      `Minimum Deposit: \`${web3.consts.democracy.minimumDeposit.toHuman()}\`\n`,
      `Fast Track Voting Period: \`${web3.consts.democracy.fastTrackVotingPeriod.toHuman()}\`\n`,
      `Cool Off Period: \`${web3.consts.democracy.cooloffPeriod.toHuman()}\`\n`,
      `Preimage Byte Deposit: \`${web3.consts.democracy.preimageByteDeposit.toHuman()}\`\n`,
      `Max Votes: \`${web3.consts.democracy.maxVotes.toHuman()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};