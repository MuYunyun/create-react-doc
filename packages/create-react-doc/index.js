#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const program = require('commander')
const {
  initProject,
  initTheme,
  initCache,
  Deploy,
  Servers,
  Build,
} = require('crd-scripts')
const { docsReadme, docsBuildDist, getDocsConfig } = require('crd-utils')
const input = require('@inquirer/input')
const pkg = require('./package.json')

program
  .version(pkg.version, '-v, --version')
  .description('Markdown doc site generator for React.')
  .option('start', 'Documents generated.')
  .option('build', 'Build the documents generated.')
  .option('deploy', 'Deploy site to gh-pages.')
  .option('theme', 'Create a new theme')
  .option('-o, --output <path>', 'Writes the compiled file to the disk directory.', '.crd-dist')
  .option('-p, --port [number]', 'The port.', 3000)
  .option('--host [host]', 'The host.', '0.0.0.0')
  .option('-b, --branch <branch>', 'Name of the branch you are pushing to.', 'gh-pages')
  .on('--help', () => {
    console.log('\n  Examples:')
    console.log()
    console.log('    $ react-doc xxx')
    console.log('    $ react-doc start')
    console.log('    $ react-doc build')
    console.log('    $ react-doc deploy')
    console.log()
  })
  // the third value in process.argv is the value we want.
  .parse(process.argv)

const { start, build, deploy, theme } = program

if (!start && !build && !deploy && !theme) return initProject(program)

if (theme) {
  return input({
    message: "What's the theme name?",
    validate: (inputThemeName) => {
      if (inputThemeName.length === 0) return 'Please input correct theme name'
      return true
    },
  }).then((themeName) => {
    initTheme(themeName)
  })
}

// create-react-doc tool root dir.
// program.crdPath = path.join(__dirname, '../');
// all markdown dir
program.markdownPaths = []
// dir for output
program.output = path.join(process.cwd(), program.output)
const docsConfig = getDocsConfig()

// assign all the markdown dir
if (start || build) {
  fs.existsSync(docsReadme) &&
    program.markdownPaths.push(docsReadme)

  docsConfig &&
    docsConfig.menu
      .forEach(itemPath =>
        program.markdownPaths.push(path.join(process.cwd(), itemPath))
      )
}

if (build && fs.pathExistsSync(docsBuildDist)) {
  // clean dir
  fs.emptyDirSync(docsBuildDist)
}

// deploy code to special git repo and branch.
if (deploy) {
  return Deploy(program, docsConfig)
}

// no point markdown paths
if (program.markdownPaths.length === 0) return console.log('Please specify the directory in config.yml.'.red)

let isExists = true
// judge if files exist.
program.markdownPaths.forEach((item) => {
  if (!fs.existsSync(item)) {
    console.log(`Error: Directory ${item.yellow} does not exist`.red)
    isExists = false
  }
})

if (isExists) {
  initCache(program, () => {
    if (build) {
      Build(program)
    } else {
      Servers(program)
    }
  })
}
