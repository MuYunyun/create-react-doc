const { removeConfig } = require('./utils');

const logOut = () => {
  removeConfig('cookies');
};

module.exports = logOut;
