const logger = require('../logger');

module.exports = app => {
  app.context.helpers = {};

  logger.info('Initialized helpers');
};
