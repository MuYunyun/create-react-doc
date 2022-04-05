const fs = require('fs')
const { docsConfig } = require('crd-utils')
const { directoryTree } = require('./conf/node-directory-tree')

module.exports = function generate(program) {
  if (!fs.existsSync(docsConfig)) {
    console.log('❎ please check config.yml in root dir!\n')
    return
  }

  const dir = program.markdownPaths
  const dirs = Array.isArray(dir) ? dir : [dir]
  const otherProps = {
    mdconf: true,
    extensions: /\.md/,
    generate: true
  }
  dirs.map(path => directoryTree({
    path,
    options: otherProps,
  }))
  console.log('✅ generate success!')
}
