const fs = require('fs');
const { ApiPromise, WsProvider } = require('@polkadot/api');

module.exports = async () => {
  const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

  const polkadotProvider = new WsProvider(config.nodes.polkadot);
  const kusamaProvider = new WsProvider(config.nodes.kusama);
  // const edgewareProvider = new WsProvider(config.nodes.edgeware);
  // const kulupuProvider = new WsProvider(config.nodes.kulupu);

  const polkadot = await ApiPromise.create({ provider: polkadotProvider });
  const kusama = await ApiPromise.create({ provider: kusamaProvider });
  // const edgeware = await ApiPromise.create({ provider: edgewareProvider });
  // const kulupu = await ApiPromise.create({ provider: kulupuProvider });
    
  return {
    polkadot,
    kusama,
    // edgeware,
    // kulupu,
  };
};
