const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const chain = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);

    const [validators] = await Promise.all([
      web3.query.session.validators(),
    ]);

    const stakingValidator = await Promise.all(
      validators.map(address => web3.derive.staking.account(address))
    );

    replyWithMarkdown(`Active Validator Count: \`${stakingValidator.length}\``, inReplyTo(message.message_id));
  };
};
