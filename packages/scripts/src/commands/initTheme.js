/**
 * This file is to init theme quickly.
 */
const path = require('path')
const { execSync } = require('child_process')
const fs = require('fs-extra')
const copyTemplate = require('copy-template-dir')
const paths = require('../conf/path')

const log = console.log; // eslint-disable-line

// eslint-disable-next-line no-unused-vars
module.exports = function (themeName) {
  const outDir = path.join(paths.projectPath, themeName)

  const crdpkg = require(paths.crdPackage); // eslint-disable-line
  // replace the last vertion with x, so it'll install autoly when the last vertion changes.
  const CRD_VERSION = crdpkg.version.split('.').slice(0, 2).concat('x').join('.')

  // clear output dir
  if (!fs.pathExistsSync(outDir)) {
    fs.ensureDirSync(outDir)
  }

  const defaultTemplatePath = `${paths.templatePath}/theme/default`

  if (!fs.pathExistsSync(defaultTemplatePath)) {
    execSync('mkdir temp && cd temp && yarn add crd-templates -D')
  }
  copyTemplate(defaultTemplatePath, outDir, {
    name: themeName,
    crdVersion: CRD_VERSION,
  }, (err, createdFiles) => {
    if (err) return log(`Copy Tamplate Error: ${err} !!!`.red)
    createdFiles.sort().forEach((createdFile) => {
      log(`  ${'create'.green} ${createdFile.replace(paths.projectPath, '')}`)
    })
    execSync('rm -rf temp')
    log('\n  initialization finished!\n'.green)
    const cmdstr = `cd ${themeName} && yarn && yarn start`.cyan
    log(`  Run the ${cmdstr} to start the website.\n\n`)
  })
}
