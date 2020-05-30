const logger = require('../logger');
const axios = require('./axios');

module.exports = app => {
  app.context.axios = axios;

  logger.info('Initialized plugins');
};
