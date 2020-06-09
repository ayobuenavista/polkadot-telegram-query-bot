const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const chain = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(chain);

    const [chainName, totalIssuance, session] = await Promise.all([
      web3.rpc.system.chain(),
      web3.query.balances.totalIssuance(),
      web3.derive.session.info()
    ]);
    console.log(parseInt(JSON.stringify(session.activeEraStart)));

    let msg = '';
    msg = msg.concat(
      `Chain: \`${chainName}\`\n`,
      `Total Issuance: \`${totalIssuance.toHuman()}\`\n`,
      `Active Era: \`${session.activeEra.toHuman()}\`\n`,
      `Start of Active Era: \`${
        new Date(
          parseInt(JSON.stringify(session.activeEraStart))
        ).toLocaleDateString()
      }\`\n`,
      `Current Era: \`${session.currentEra.toHuman()}\`\n`,
      `Current Index: \`${session.currentIndex.toHuman()}\`\n`,
      `Era Length: \`${session.eraLength.toHuman()}\`\n`,
      `Session Length: \`${session.sessionLength.toHuman()}\`\n`,
      `Session Per Era: \`${session.sessionsPerEra.toHuman()}\`\n`,
      `Validator Count: \`${session.validatorCount.toHuman()}\`\n`,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};