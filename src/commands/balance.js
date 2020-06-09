const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { checkAddress, getWeb3 } = helpers;
    const { args } = state.command;

    if (args.length < 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of required 1 provided.`
      );
      return;
    }

    const chain = args[1] ? args[1].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);
    const address = args[0];
    const [valid, error] = checkAddress(address, chain);

    if (!valid) {
      reply(
        `ERROR: ${error}`
      );
      return;
    }

    const { data: balance } = await web3.query.system.account(address);

    let msg = '';
    msg = msg.concat(
      `Total: \`${balance.free.toHuman()}\`\n`,
      `Bonded: \`${balance.miscFrozen.toHuman()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};
