require('dotenv').config();

const Telegraf = require('telegraf');
const commands = require('./commands');
const helpers = require('./helpers');
const middleware = require('./middleware');
const handlers = require('./handlers');
const plugins = require('./plugins');

const app = new Telegraf(process.env.TELEGRAM_TOKEN);

app.telegram.getMe().then(info => {
  app.options.username = info.username;
});

plugins(app);
middleware(app);
commands(app);
handlers(app);
helpers(app);

module.exports = app;
