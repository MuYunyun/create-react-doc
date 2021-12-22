const initProject = require('./src/commands/initProject')
const initTheme = require('./src/commands/initTheme')
const initCache = require('./src/utils/initCache')
const Servers = require('./src/server')
const Build = require('./src/build')
const Deploy = require('./src/deploy')
const Generate = require('./src/generate')
const paths = require('./src/conf/path')

module.exports = {
  initProject,
  initTheme,
  initCache,
  Servers,
  Build,
  Deploy,
  Generate,
  paths,
}
