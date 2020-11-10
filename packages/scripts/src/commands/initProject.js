const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs-extra');
const copyTemplate = require('copy-template-dir');
const paths = require('../conf/path');

const log = console.log; // eslint-disable-line

// eslint-disable-next-line no-unused-vars
module.exports = function (params) {
  // process.argv[2] means the first argument after react-doc, eg react doc abc, process.argv[2] is abc
  const outDir = path.join(paths.projectPath, process.argv[2]);
  const projectName = path.basename(outDir);

  const crdpkg = require(paths.crdPackage); // eslint-disable-line
  // replace the last vertion with x, so it'll install autoly when the last vertion changes.
  const CRD_VERSION = crdpkg.version.split('.').slice(0, 2).concat('x').join('.');

  // clear output dir
  if (!fs.pathExistsSync(outDir)) {
    fs.ensureDirSync(outDir);
  }

  // copy template, see https://github.com/MuYunyun/create-react-doc/issues/50
  if (!fs.pathExistsSync(paths.defaultTemplatePath)) {
    execSync('mkdir temp && cd temp && yarn add crd-templates -D');
  }
  copyTemplate(paths.defaultTemplatePath, outDir, {
    name: projectName,
    crdVersion: CRD_VERSION,
  }, (err, createdFiles) => {
    if (err) return log(`Copy Tamplate Error: ${err} !!!`.red);
    createdFiles.sort().forEach((createdFile) => {
      log(`  ${'create'.green} ${createdFile.replace(paths.projectPath, '')}`);
    });
    // this is to hack https://github.com/yoshuawuyts/copy-template-dir/issues/16
    execSync(`cp -r ${paths.defaultTemplatePath}/.github ${outDir}`);
    execSync('rm -rf temp');
    log('\n  initialization finished!\n'.green);
    const cmdstr = `cd ${projectName} && yarn && yarn start`.cyan;
    log(`  Run the ${cmdstr} to start the website.\n\n`);
  });
};
