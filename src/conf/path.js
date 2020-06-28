const path = require('path');
const fs = require('fs');

// handle the problem of symbol in any platform
const appDirectory = fs.realpathSync(process.cwd());
const toolDirectory = fs.realpathSync(__dirname);
// Markdown 所在目录
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// crd 工具所在目录
const resolveTool = relativePath => path.resolve(toolDirectory, relativePath);

// 获取 crd 配置
function getCrdConf() {
  const packagePath = resolveApp('./package.json');
  let conf = {};
  if (fs.existsSync(packagePath)) {
    const confPkg = require(packagePath); // eslint-disable-line
    conf = confPkg.crd;
  }
  const confPath = resolveApp('./.crdrc.json');
  if (fs.existsSync(confPath)) {
    const confRc = require(confPath) // eslint-disable-line
    conf = confRc;
  }
  return conf;
}

function getConfigFilePath(fileName, type) {
  const conf = getCrdConf();
  // 这里是读取配置
  if (conf && conf[type]) {
    // 主题目录加载
    if (type === 'theme') {
      if (!conf[type]) conf[type] = fileName;
      const _path = path.resolve(appDirectory, 'theme', conf[type]);
      const _NodeModulesPath = path.resolve(appDirectory, 'node_modules', conf[type]);
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
    // 默认根目录下的 favicon|logo
    return _filepath;
  }
  return false;
}

// Get favicon path
const faviconPath = () => {
  const _path = getConfigFilePath('./favicon.ico', 'favicon');
  if (_path) return _path;
  return resolveTool('../../theme/default/favicon.ico');
};

// Get logo path
const logoPath = () => {
  const _path = getConfigFilePath('./logo.svg', 'logo');
  if (_path) return _path;
  return false;
};

// Get theme path
const getThemePath = () => {
  const _path = getConfigFilePath('./default', 'theme');
  if (_path) return _path;
  return resolveTool('../../theme/default');
};

const modPath = resolveApp('node_modules');
function getExcludeFoldersRegExp() {
  if (!fs.existsSync(modPath)) return [];
  let regxExc = fs.readdirSync(modPath);
  regxExc = regxExc.filter(item => !/crd(.*)/.test(item));

  regxExc = regxExc.map((item) => {
    let rgxPath = `node_modules${path.sep}${item}`;
    if (path.sep === '\\') {
      rgxPath = `node_modules\\${path.sep}${item}`;
    }
    return new RegExp(rgxPath);
  });
  return regxExc;
}

module.exports = {
  // markdown dir
  crdConf: getCrdConf(),
  docsThemePath: getThemePath(),
  // docsPackage: resolveApp('./package.json'),
  // docsNodeModules: resolveApp('node_modules'),
  docsGitIgnore: resolveApp('.gitignore'),
  docsConfig: resolveApp('config.yml'),
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  // docTreePath: resolveApp('.cache/.reactdoc.tree.json'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  projectPath: appDirectory,
  publicPath: '',
  logoPath: logoPath(),
  // crd tool dir
  getExcludeFoldersRegExp: getExcludeFoldersRegExp(),
  crdPackage: resolveTool('../../package.json'),
  defaultNodeModules: modPath,
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
