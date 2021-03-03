const { resolveApp, resolveTool } = require('./path')

module.exports = {
  resolveApp,
  resolveTool,
  // common paths
  docsGitIgnore: resolveApp('.gitignore'),
  docsBase: resolveApp(''),
  docsConfig: resolveApp('config.yml'),
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  searchFilePath: resolveApp('.cache/search.js'),
  templatePath: resolveApp('node_modules/crd-templates'),
  defaultHTMLPath: resolveApp('node_modules/crd-theme/index.html'),
}
