const path = require('path');
const fs = require('fs-extra');
const copyTemplate = require('copy-template-dir');
const paths = require('../conf/path');

const log = console.log; // eslint-disable-line

module.exports = function (params) {
  const outDir = path.join(paths.projectPath, process.argv[2]);
  const projectName = path.basename(outDir);

  const crdpkg = require(paths.crdPackage); // eslint-disable-line
  // replace the last vertion with x, so it'll install autoly when the last vertion changes.
  const CRD_VERSION = crdpkg.version.split('.').slice(0, 2).concat('x').join('.');

  // clear output dir
  if (!fs.pathExistsSync(outDir)) {
    fs.ensureDirSync(outDir);
  }

  // if target dir is not null return false hint
  if (fs.readdirSync(path.join(outDir)).length > 0) {
    return log(`\n ${'initialization failed! '.red} ${outDir.yellow} ${'is not an empty directory.'.red}\n`);
  }

  // copy template
  if (fs.pathExistsSync(paths.defaultTemplatePath)) {
    copyTemplate(paths.defaultTemplatePath, outDir, {
      name: projectName,
      crdVersion: CRD_VERSION,
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
