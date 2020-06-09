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
    const range = args[0];

    try {
      let [start, end] = range.split('-');

      const [validators, stashes] = await Promise.all([
        web3.query.session.validators(),
        web3.derive.staking.stashes(),
      ]);
  
      const intentionAddresses = stashes.filter(address => !validators.includes(address));
      const intentionStaking = await Promise.all(
        intentionAddresses.map(address => web3.derive.staking.account(address))
      );

      if (end > intentionStaking.length) {
        end = intentionStaking.length;
      }

      let balance;
      let msg = '';
      for (let i = start; i <= end; i++) {
        balance = await web3.query.system.account(intentionStaking[i].accountId);

        msg = msg.concat(
          `${i}] *${intentionStaking[i].accountId}*\n`,
          `Staked: \`${balance.data.free.toHuman()}\`\n`,
          `Commission: \`${intentionStaking[i].validatorPrefs.commission.toHuman()}\`\n`,
          `Nominations: \`${intentionStaking[i].nominators.lengths}\`\n\n`,
        );
      }

      replyWithMarkdown(msg, inReplyTo(message.message_id));
    } catch (e) {
      reply('ERROR: Invalid range', inReplyTo(message.message_id));
    }
  };
};