const logger = require('../logger');
const balance = require('./balance');
const chainInfo = require('./chainInfo');
const democracyInfo = require('./democracyInfo');
const electionsInfo = require('./electionsInfo');
const intentions = require('./intentions');
const latestBlock = require('./latestBlock');
const runtimeConstants = require('./runtimeConstants');
const stakingInfo = require('./stakingInfo');
const validators = require('./validators');

module.exports = async app => {
  app.command('balance', balance());
  app.command('chaininfo', chainInfo());
  app.command('chainInfo', chainInfo());
  app.command('democracyInfo', democracyInfo());
  app.command('democracyinfo', democracyInfo());
  app.command('electionsInfo', electionsInfo());
  app.command('electionsinfo', electionsInfo());
  app.command('intentions', intentions());
  app.command('latestBlock', latestBlock());
  app.command('latestblock', latestBlock());
  app.command('runtimeconstants', runtimeConstants());
  app.command('runtimeconstants', runtimeConstants());
  app.command('runtimeConstants', runtimeConstants());
  app.command('stakinginfo', stakingInfo());
  app.command('stakingInfo', stakingInfo());
  app.command('validators', validators());

  logger.info('Initialized commands');
};
