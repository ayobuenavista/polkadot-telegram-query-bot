module.exports = app => {
  const { nodes } = app.context;
  
  return network => {
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
};
