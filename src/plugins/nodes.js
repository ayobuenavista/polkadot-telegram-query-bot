const fs = require('fs');
const { ApiPromise, WsProvider } = require('@polkadot/api');

module.exports = async () => {
  const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

  const polkadotProvider = new WsProvider(config.nodes.polkadot);
  const kusamaProvider = new WsProvider(config.nodes.kusama);
  // const edgewareProvider = new WsProvider(config.nodes.edgeware);
  const kulupuProvider = new WsProvider(config.nodes.kulupu);

  const polkadot = await ApiPromise.create({ polkadotProvider });
  const kusama = await ApiPromise.create({ kusamaProvider });
  // const edgeware = await ApiPromise.create({ edgewareProvider });
  const kulupu = await ApiPromise.create({ kulupuProvider });
    
  return {
    polkadot,
    kusama,
    // edgeware,
    kulupu,
  };
};
