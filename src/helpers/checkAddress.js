const { checkAddress } = require('@polkadot/util-crypto');

module.exports = (address, network) => {
  let prefix;

  switch (network) {
    case 'polkadot':
      prefix = 0;
      break;
    case 'kusama':
      prefix = 2;
      break;
    case 'edgeware':
      prefix = 7;
      break;
    case 'kulupu':
      prefix = 16;
      break;
    default:
      prefix = 42;
      break;
  }

  return checkAddress(address, prefix);
};
