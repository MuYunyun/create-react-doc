const PATH = require('path');
const FS = require('fs-extra');
const copyTemplate = require('copy-template-dir');
const paths = require('../conf/path');

const log = console.log; // eslint-disable-line

module.exports = function (params) {
  const outDir = typeof params.init === 'string' ? PATH.join(paths.projectPath, params.init) : paths.projectPath;
  const projectName = PATH.basename(outDir);

  const rdocpkg = require(paths.rdocPackage); // eslint-disable-line
  // 最后一个版本号替换成 x , 当发生变化最后一个版本安装最新版本
  const RDOC_VERSION = rdocpkg.version.split('.').slice(0, 2).concat('x').join('.');

  // 输出目录清空
  if (!FS.pathExistsSync(outDir)) {
    FS.ensureDirSync(outDir);
  }

  // 目录不为空返回错误提示
  if (FS.readdirSync(PATH.join(outDir)).length > 0) {
    return log(`\n ${'initialization failed! '.red} ${outDir.yellow} ${'is not an empty directory.'.red}\n`);
  }

  // 复制模板
  if (FS.pathExistsSync(paths.defaultTemplatePath)) {
    copyTemplate(paths.defaultTemplatePath, outDir, {
      name: projectName,
      rdocVersion: RDOC_VERSION,
    }, (err, createdFiles) => {
      if (err) return log(`Copy Tamplate Error: ${err} !!!`.red);
      createdFiles.sort().forEach((createdFile) => {
        log(`  ${'create'.green} ${createdFile.replace(paths.projectPath, '')}`);
      });

      log('\n  initialization finished!\n'.green);
      let cmdstr = `cd ${projectName} && npm install && npm start`.cyan;
      if (typeof params.init !== 'string') {
        cmdstr = 'npm start'.cyan;
      }
      log(`  Run the ${cmdstr} to start the website.\n\n`);
    });
  } else {
    return log(`Error: Directory ${paths.defaultTemplatePath} does not exist`.red);
  }
};
