const logger = require('../logger');

module.exports = async app => {
  const { nodes } = app.context;

  const getWeb3 = network => {
    switch (network) {
      case 'polkadot':
        return nodes.polkadot;
      case 'kusama':
        return nodes.kusama;
      case 'edgeware':
        return nodes.edgeware;
      case 'kulupu':
        return nodes.kulupu;
      default:
        return nodes.polkadot;
    }
  };

  app.context.helpers = {
    getWeb3,
  };

  logger.info('Initialized helpers');
};
