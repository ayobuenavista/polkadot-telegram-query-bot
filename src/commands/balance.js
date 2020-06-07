const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { checkAddress, fromPlanck, getWeb3 } = helpers;
    const { args } = state.command;

    if (args.length < 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of required 1 provided.`
      );
      return;
    }

    const network = args[1] ? args[1].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);
    const address = args[0];
    const [valid, error] = checkAddress(address, network);

    if (!valid) {
      reply(
        `ERROR: ${error}`
      );
      return;
    }

    const { data: balance } = await web3.query.system.account(address);

    let msg = '';
    msg = msg.concat(
      `Total: \`${fromPlanck(balance.free)}\`\n`,
      `Bonded: \`${fromPlanck(balance.miscFrozen)}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};
