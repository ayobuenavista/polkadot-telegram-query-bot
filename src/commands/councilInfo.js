const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const chain = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);

    const [members, prime, proposalCount] = await Promise.all([
      web3.query.council.members(),
      web3.query.council.prime(),
      web3.query.council.proposalCount(),
    ]);

    console.log(`F${prime}F`);

    let msg = '';
    msg = msg.concat(
      `Prime: \`${(prime == '') ? 'None' : prime }\`\n`,
      `Proposal Count: \`${proposalCount.toHuman()}\`\n`,
      `Members:\`${(members.length > 0) ? '\n' : ' None'}\``,
    );

    for (let i = 0; i < members.length; i++) {
      msg = msg.concat(`${i}] \`${members[i]}\`\n`);
    }

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};