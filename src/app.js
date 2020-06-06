require('dotenv').config();

const Telegraf = require('telegraf');
const commands = require('./commands');
const helpers = require('./helpers');
const middleware = require('./middleware');
const handlers = require('./handlers');
const plugins = require('./plugins');

module.exports = async () => {
  const app = new Telegraf(process.env.TELEGRAM_TOKEN);

  await plugins(app);
  await middleware(app);
  await commands(app);
  await handlers(app);
  await helpers(app);

  return app;
};
