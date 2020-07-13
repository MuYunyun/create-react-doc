const path = require('path');
const fs = require('fs');

// handle the problem of symbol in any platform
const appDirectory = fs.realpathSync(process.cwd());
const toolDirectory = fs.realpathSync(__dirname);
// Markdown dir
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// crd tool dir
const resolveTool = relativePath => path.resolve(toolDirectory, relativePath);
const modPath = resolveApp('node_modules');
// get config crd from package.json
function getCrdConf() {
  const packagePath = resolveApp('./package.json');
  let conf = {};
  if (fs.existsSync(packagePath)) {
    const confPkg = require(packagePath); // eslint-disable-line
    conf = confPkg.crd;
  }
  return conf;
}

function getConfigFilePath(fileName, type) {
  const conf = getCrdConf();
  // read config
  if (conf && conf[type]) {
    // load theme dir
    if (type === 'theme') {
      if (!conf[type]) conf[type] = fileName;
      const _path = path.resolve(appDirectory, 'theme', conf[type]);
      const _NodeModulesPath = path.resolve(
        appDirectory,
        'node_modules',
        conf[type]
      );
      if (fs.existsSync(_path)) {
        return fs.realpathSync(_path);
      } else if (fs.existsSync(_NodeModulesPath)) {
        return fs.realpathSync(_NodeModulesPath);
      }
      return false;
    }
    if (/^(favicon|logo)$/.test(type)) {
      return path.resolve(appDirectory, conf[type]);
    }
  }
  const _filepath = path.resolve(appDirectory, fileName);
  if (fs.existsSync(_filepath)) {
    // favicon|logo in default root dir.
    return _filepath;
  }
  return false;
}

// Get favicon path
const faviconPath = () => {
  const _path = getConfigFilePath('./favicon.ico', 'favicon');
  if (_path) return _path;
  // the path'll be writen dynamiclly in the future
  return resolveApp('node_modules/crd-theme/favicon.ico');
};

// Get logo path
const logoPath = () => {
  const _path = getConfigFilePath('./logo.svg', 'logo');
  if (_path) return _path;
  return false;
};

// get exclude folders
function getExcludeFoldersRegExp() {
  if (!fs.existsSync(modPath)) return [];
  let regxExc = fs.readdirSync(modPath);
  regxExc = regxExc.filter(
    item => !/create-react-doc(.*)|crd-scripts|crd-theme/.test(item)
  );
  regxExc = regxExc.map((item) => {
    let rgxPath = `node_modules${path.sep}${item}`;
    if (path.sep === '\\') {
      // to watch: is '\\' needful?
      rgxPath = `node_modules\\${path.sep}${item}`;
    }
    return new RegExp(rgxPath);
  });
  return regxExc;
}

module.exports = {
  // markdown dir
  crdConf: getCrdConf(),
  // docsPackage: resolveApp('./package.json'),
  docsGitIgnore: resolveApp('.gitignore'),
  docsNodeModules: resolveApp(''),
  docsConfig: resolveApp('config.yml'),
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  defaultHTMLPath: resolveApp('node_modules/crd-theme/index.html'),
  defaultTemplatePath: resolveTool('node_modules/crd-templates/default'),
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
};
