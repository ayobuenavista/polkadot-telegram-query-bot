const logger = require('../logger');
const chainCandidate = require('./chainCandidate');

module.exports = async app => {
  app.command('chaincandidate', chainCandidate());
  app.command('chainCandidate', chainCandidate());

  logger.info('Initialized commands');
};
