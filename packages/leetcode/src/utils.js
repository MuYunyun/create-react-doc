const { promisify } = require('util');
const homedir = require('os').homedir();
const fs = require('fs');
const path = require('path');
let request = require('request');

const parseCookie = response =>
  response.headers['set-cookie']
    .map((x = '') => x.split('; '))
    .reduce((acc, item) => acc.concat(item))
    .reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = value;
      return acc;
    }, {});

request = promisify(request);
request.post = promisify(request.post);

const getHeaders = session => ({
  'Content-Type': 'application/json',
  'x-csrftoken': session.csrftoken,
  Cookie: `LEETCODE_SESSION=${session.LEETCODE_SESSION};csrftoken=${session.csrftoken};`,
});

const unicodeToChar = text =>
  text.replace(/\\u[\dA-F]{4}/gi, match =>
    String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
  );

const configPath = path.join(homedir, '.crd-leetcode.json');
const getConfig = () => {
  try {
    const config = JSON.parse(fs.readFileSync(configPath));
    return config;
  } catch (error) {
    return {
      country: undefined,
      cookies: undefined,
    };
  }
};
const stringify = data => JSON.stringify(data, null, 2);

const setConfig = (payload = {}) => {
  const config = {
    ...getConfig(),
    ...payload,
  };
  fs.writeFileSync(configPath, stringify(config));
};

const removeConfig = (key) => {
  const config = getConfig();
  config[key] = undefined;
  fs.writeFileSync(configPath, stringify(config));
};

module.exports = {
  parseCookie,
  request,
  getHeaders,
  unicodeToChar,
  getConfig,
  setConfig,
  removeConfig,
  stringify,
};
