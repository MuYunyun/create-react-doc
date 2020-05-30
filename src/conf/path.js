const PATH = require('path');
const FS = require('fs');

// 确保在项目文件夹中的任何符号都解决了：
const appDirectory = FS.realpathSync(process.cwd());
const toolDirectory = FS.realpathSync(__dirname);
// Markdown 所在目录
const resolveApp = relativePath => PATH.resolve(appDirectory, relativePath);
// rdoc 工具所在目录
const resolveTool = relativePath => PATH.resolve(toolDirectory, relativePath);

// 获取 rdoc 配置
function getRdocConf() {
  const packagePath = resolveApp('./package.json');
  let conf = {};
  if (FS.existsSync(packagePath)) {
    const confPkg = require(packagePath); // eslint-disable-line
    conf = confPkg.rdoc;
  }
  const confPath = resolveApp('./.rdocrc.json');
  if (FS.existsSync(confPath)) {
    const confRc = require(confPath) // eslint-disable-line
    conf = confRc;
  }
  return conf;
}

function getConfigFilePath(fileName, type) {
  const conf = getRdocConf();
  // 这里是读取配置
  if (conf && conf[type]) {
    // 主题目录加载
    if (type === 'theme') {
      if (!conf[type]) conf[type] = fileName;
      const _path = PATH.resolve(appDirectory, 'theme', conf[type]);
      const _NodeModulesPath = PATH.resolve(appDirectory, 'node_modules', conf[type]);
      if (FS.existsSync(_path)) {
        return FS.realpathSync(_path);
      } else if (FS.existsSync(_NodeModulesPath)) {
        return FS.realpathSync(_NodeModulesPath);
      }
      return false;
    }
    if (/^(favicon|logo)$/.test(type)) {
      return PATH.resolve(appDirectory, conf[type]);
    }
  }
  const _filepath = PATH.resolve(appDirectory, fileName);
  if (FS.existsSync(_filepath)) {
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
  if (!FS.existsSync(modPath)) return [];
  let regxExc = FS.readdirSync(modPath);
  regxExc = regxExc.filter(item => !/rdoc(.*)/.test(item));

  regxExc = regxExc.map((item) => {
    let rgxPath = `node_modules${PATH.sep}${item}`;
    if (PATH.sep === '\\') {
      rgxPath = `node_modules\\${PATH.sep}${item}`;
    }
    return new RegExp(rgxPath);
  });
  return regxExc;
}

module.exports = {
  // Markdown 所在目录
  rdocConf: getRdocConf(),
  appThemePath: getThemePath(),
  appPackage: resolveApp('./package.json'),
  appNodeModules: resolveApp('node_modules'),
  appBuildDist: resolveApp('.rdoc-dist'),
  catchDirPath: resolveApp('.cache'),
  docTreePath: resolveApp('.cache/.reactdoc.tree.json'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  projectPath: appDirectory,
  publicPath: '',
  logoPath: logoPath(),
  // rdoc 工具所在目录
  getExcludeFoldersRegExp: getExcludeFoldersRegExp(),
  rdocPackage: resolveTool('../../package.json'),
  defaultNodeModules: modPath,
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
