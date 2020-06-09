const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const chain = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);

    if (web3.query.sudo) {
      const [key] = await Promise.all([
        web3.query.sudo.key(),
      ]);

      let msg = '';
      msg = msg.concat(
        `Sudo Key: \`${key}\`\n`,
      );
  
      replyWithMarkdown(msg, inReplyTo(message.message_id));
    } else {
      replyWithMarkdown('Sudo key does not exist for this chain', inReplyTo(message.message_id));
    }
  };
};