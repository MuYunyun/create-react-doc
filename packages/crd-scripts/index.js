const initProject = require('./src/commands/initProject');
const initCache = require('./src/utils/initCache');
const Servers = require('./src/server');
const Build = require('./src/build');
const Deploy = require('./src/deploy');
const paths = require('./src/conf/path');
const { getDocsConfig } = require('./src/utils');

module.exports = {
  initProject,
  initCache,
  Servers,
  Build,
  Deploy,
  paths,
  getDocsConfig,
};
