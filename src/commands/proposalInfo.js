const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    if (args.length < 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of required 1 provided.`
      );
      return;
    }

    const network = args[1] ? args[1].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);
    const hash = args[0];

    try {
      let [proposal, voting] = await Promise.all([
        web3.query.council.proposalOf(hash),
        web3.query.council.voting(hash),
      ]);
      proposal = JSON.parse(proposal);
      voting = JSON.parse(voting);

      let msg = '';
      msg = msg.concat(
        `Proposal ID: \`${proposal.args.proposal_id}\`\n`,
        `Threshold: \`${voting.threshold}\`\n`,
      );

      msg = msg.concat(`Ayes:\`${(voting.ayes.length > 0) ? '\n' : ' None'}\``);

      for (let i = 0; i < voting.ayes.length; i++) {
        msg = msg.concat(`${i}] \`${voting.ayes[i]}\`\n`);
      }

      msg = msg.concat(`Nays:\`${(voting.nays.length > 0) ? '\n' : ' None'}\``);

      for (let i = 0; i < voting.nays.length; i++) {
        msg = msg.concat(`${i}] \`${voting.nays[i]}\`\n`);
      }

      replyWithMarkdown(msg, inReplyTo(message.message_id));
    } catch (e) {
      reply('ERROR: Invalid proposal hash', inReplyTo(message.message_id));
    }
  };
};