const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const { resolveApp } = require('crd-utils')
const chalk = require('chalk')
const { getDocsConfig } = require('../utils')

// handle the problem of symbol in any platform
const appDirectory = fs.realpathSync(process.cwd())

const modPath = resolveApp('node_modules')
// get config crd from package.json
function getCrdConf() {
  const packagePath = resolveApp('./package.json')
  let conf = {}
  if (fs.existsSync(packagePath)) {
    const confPkg = require(packagePath); // eslint-disable-line
    conf = confPkg.crd
  }
  return conf
}

function getConfigFilePath(fileName, type) {
  const conf = getCrdConf()
  // read config
  if (conf && conf[type]) {
    // load theme dir
    if (type === 'theme') {
      if (!conf[type]) conf[type] = fileName
      const _path = path.resolve(appDirectory, 'theme', conf[type])
      const _NodeModulesPath = path.resolve(
        appDirectory,
        'node_modules',
        conf[type],
      )
      if (fs.existsSync(_path)) {
        return fs.realpathSync(_path)
      } else if (fs.existsSync(_NodeModulesPath)) {
        return fs.realpathSync(_NodeModulesPath)
      }
      return false
    }
    if (/^(favicon|logo)$/.test(type)) {
      return path.resolve(appDirectory, conf[type])
    }
  }
  const _filepath = path.resolve(appDirectory, fileName)
  if (fs.existsSync(_filepath)) {
    // favicon|logo in default root dir.
    return _filepath
  }
  return false
}

// Get favicon path
const faviconPath = () => {
  const _path = getConfigFilePath('./favicon.ico', 'favicon')
  if (_path) return _path
  // the path'll be writen dynamiclly in the future
  return resolveApp('node_modules/crd-theme/favicon.ico')
}

// Get logo path
const logoPath = () => {
  const _path = getConfigFilePath('./logo.svg', 'logo')
  if (_path) return _path
  return false
}

let theme = ''
// theme in develop mode.
let devTheme = false

const docsConfigPath = resolveApp('config.yml')

const getTheme = () => {
  if (docsConfigPath) {
    const docsConfig = getDocsConfig()
    if (!docsConfig) return
    if (docsConfig.devTheme) {
      devTheme = docsConfig.devTheme
      theme = docsConfig.devTheme
    } else {
      theme = docsConfig.theme

      // install custom theme
      if (!fs.existsSync(resolveApp(`node_modules/${theme}`))) {
      // todo: chalkblue(xxx) not show in the terminal
        chalk.blue(`Install theme ${theme}`)
        // -W means ignore-workspace-root-check
        execSync(`yarn add ${theme} -D -W`)
        chalk.blue(`Install theme ${theme} done`)
      } else {
        chalk.blue(`Upgrade theme ${theme}`)
        // -W means ignore-workspace-root-check
        execSync(`yarn upgrade ${theme}`)
        chalk.blue(`Upgrade theme ${theme} done`)
      }
    }
  }
}

getTheme()

// get exclude folders
function getExcludeFoldersRegExp() {
  if (!fs.existsSync(modPath)) return []
  let regexp = fs.readdirSync(modPath)
  /** whitelist to include */
  const whiteListRegExp = new RegExp(`create-react-doc(.*)|crd-scripts|crd-theme|${theme}`)
  regexp = regexp.filter(
    item => !whiteListRegExp.test(item),
    // item => !/create-react-doc(.*)|crd-scripts|crd-theme/.test(item),
  )
  regexp = regexp.map((item) => {
    let rgxPath = `node_modules${path.sep}${item}`
    if (path.sep === '\\') {
      // to watch: is '\\' needful?
      rgxPath = `node_modules\\${path.sep}${item}`
    }
    return new RegExp(rgxPath)
  })
  return regexp
}

// crd tool dir
const toolDirectory = fs.realpathSync(__dirname)
const resolveTool = relativePath => path.resolve(toolDirectory, relativePath)

module.exports = {
  // markdown dir
  crdConf: getCrdConf(),
  docsGitIgnore: resolveApp('.gitignore'),
  docsNodeModules: resolveApp(''),
  docsConfig: docsConfigPath,
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  searchFilePath: resolveApp('.cache/search.js'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  templatePath: resolveApp('node_modules/crd-templates'),
  defaultHTMLPath: resolveApp('node_modules/crd-theme/index.html'),
  defaultTemplateThemePath: resolveApp('node_modules/crd-templates/theme/default'),
  defaultTheme: devTheme
    ? resolveApp(`${devTheme}`)
    : resolveApp(`node_modules/${theme}`),
  defaultNodeModules: modPath,
  projectPath: appDirectory,
  publicPath: '',
  logoPath: logoPath(),
  // crd tool dir
  getExcludeFoldersRegExp: getExcludeFoldersRegExp(),
  crdPackage: resolveTool('../../package.json'),
  defaultFaviconPath: faviconPath(),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
}
