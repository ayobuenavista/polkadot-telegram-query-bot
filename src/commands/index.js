const logger = require('../logger');
const balance = require('./balance');
const chainCandidate = require('./chainCandidate');
const democracyInfo = require('./democracyInfo');
const electionsInfo = require('./electionsInfo');
const latestBlock = require('./latestBlock');
const runtimeConstants = require('./runtimeConstants');
const stakingInfo = require('./stakingInfo');

module.exports = async app => {
  app.command('balance', balance());
  app.command('chaincandidate', chainCandidate());
  app.command('chainCandidate', chainCandidate());
  app.command('democracyInfo', democracyInfo());
  app.command('democracyinfo', democracyInfo());
  app.command('electionsInfo', electionsInfo());
  app.command('electionsinfo', electionsInfo());
  app.command('latestBlock', latestBlock());
  app.command('latestblock', latestBlock());
  app.command('runtimeconstants', runtimeConstants());
  app.command('runtimeconstants', runtimeConstants());
  app.command('runtimeConstants', runtimeConstants());
  app.command('stakinginfo', stakingInfo());
  app.command('stakingInfo', stakingInfo());

  logger.info('Initialized commands');
};
