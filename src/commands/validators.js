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

    const chain = args[1] ? args[1].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);
    const range = args[0];

    try {
      let [start, end] = range.split('-');

      const [validators, heartbeats] = await Promise.all([
        web3.query.session.validators(),
        web3.derive.imOnline.receivedHeartbeats(),
      ]);
  
      const stakingValidator = await Promise.all(
        validators.map(address => web3.derive.staking.account(address))
      );
  
      stakingValidator.forEach(validator => {
        if (heartbeats[validator.accountId]) {
          validator.online = heartbeats[validator.accountId];
        }
      });

      if (end > stakingValidator.length) {
        end = stakingValidator.length - 1;
      }
  
      let balance;
      let prefs;
      let msg = '';

      msg = msg.concat(
        `Active Validator Count: \`${stakingValidator.length}\`\n`,
        `Displaying validators ${start} to ${end}\n\n`,
      );
      for (let i = start; i <= end; i++) {
        [balance, prefs] = await Promise.all([
          web3.query.system.account(stakingValidator[i].accountId),
          web3.query.staking.validators(stakingValidator[i].accountId),
        ]);
  
        msg = msg.concat(
          `${i}] *${stakingValidator[i].accountId}*\n`,
          `Staked: \`${balance.data.free.toHuman()}\`\n`,
          `Commission: \`${prefs.commission.toHuman()}\`\n`,
          `Online: \`${stakingValidator[i].online.isOnline}\`\n\n`,
        );
      }
  
      replyWithMarkdown(msg, inReplyTo(message.message_id));
    } catch (e) {
      reply('ERROR: Invalid range', inReplyTo(message.message_id));
    }
  };
};
