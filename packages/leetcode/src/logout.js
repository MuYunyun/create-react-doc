const fs = require('fs');
const { getCookiePath } = require('./utils');

module.exports = () => {
  const cookiePath = getCookiePath();
  fs.rmdirSync(cookiePath);
};
