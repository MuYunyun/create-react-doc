const fs = require('fs')
const yaml = require('js-yaml')
const { resolveApp, resolveTool } = require('./path')

const docsConfig = resolveApp('config.yml')

/**
 * get docs config, see https://github.com/nodeca/js-yaml/blob/2d1fbed8f3a76ff93cccb9a8a418b4c4a482d3d9/lib/js-yaml/loader.js#L1590-L1592
 */
const getDocsConfig = () => {
  /* avoid reference loop, so use resolveApp('config.yml') instead of refrence from paths. */
  // const docsConfig = resolveApp('config.yml')
  if (!fs.existsSync(docsConfig)) {
    return null
  }
  return yaml.safeLoad(fs.readFileSync(docsConfig))
}

module.exports = {
  resolveApp,
  resolveTool,
  getDocsConfig,
  // common paths
  docsGitIgnore: resolveApp('.gitignore'),
  docsBase: resolveApp(''),
  docsConfig,
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  searchFilePath: resolveApp('.cache/search.js'),
  templatePath: resolveApp('node_modules/crd-templates'),
  defaultHTMLPath: resolveApp('node_modules/crd-theme/index.html'),
}
