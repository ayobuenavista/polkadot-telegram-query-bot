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
    const blockNumber = args[0];
    const blockHash = await web3.rpc.chain.getBlockHash(blockNumber);
    const header = await web3.derive.chain.getHeader(blockHash);

    let msg = '';
    msg = msg.concat(
      `Hash: \`${blockHash.hash}\`\n`,
      `Parent Hash: \`${header.parentHash}\`\n`,
      `Extrinsics Root: \`${header.extrinsicsRoot}\`\n`,
      `State Root: \`${header.stateRoot}\`\n`,
      `Author: \`${header.author}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};