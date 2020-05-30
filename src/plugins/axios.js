const Axios = require('axios');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

const api = Axios.create({
  baseURL: config.axios.api.baseURL,
  timeout: config.axios.api.timeout,
});

const axios = {
  api,
};

module.exports = axios;
