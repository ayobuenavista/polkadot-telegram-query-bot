const logger = require('../logger');
const checkAddress = require('./checkAddress');
const fromPlanck = require('./fromPlanck');
const getWeb3 = require('./getWeb3');

module.exports = async app => {
  app.context.helpers = {
    checkAddress,
    fromPlanck,
    getWeb3: getWeb3(app),
  };

  logger.info('Initialized helpers');
};
