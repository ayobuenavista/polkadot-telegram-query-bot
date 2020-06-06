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
      `Enactment Period: \`${web3.consts.democracy.enactmentPeriod.toNumber()}\`\n`,
      `Launch Period: \`${web3.consts.democracy.launchPeriod.toNumber()}\`\n`,
      `Voting Period: \`${web3.consts.democracy.votingPeriod.toNumber()}\`\n`,
      `Minimum Deposit: \`${web3.consts.democracy.minimumDeposit.toNumber()}\`\n`,
      `Fast Track Voting Period: \`${web3.consts.democracy.fastTrackVotingPeriod.toNumber()}\`\n`,
      `Cool Off Period: \`${web3.consts.democracy.cooloffPeriod.toNumber()}\`\n`,
      `Preimage Byte Deposit: \`${web3.consts.democracy.preimageByteDeposit.toNumber()}\`\n`,
      `Max Votes: \`${web3.consts.democracy.maxVotes.toNumber()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};