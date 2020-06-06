const logger = require('../logger');
const nodes = require('./nodes');

module.exports = async app => {
  app.context.nodes = await nodes();

  logger.info('Initialized plugins');
};
