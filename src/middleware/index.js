const logger = require('../logger');
const commandArgs = require('./commandArgs');

module.exports = async app => {
  app.use(commandArgs());

  logger.info('Initialized middleware');
};
