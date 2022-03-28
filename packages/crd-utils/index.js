const fs = require('fs')
const yaml = require('js-yaml')
const { resolveApp, resolveTool } = require('./path')

/* avoid reference loop, so use resolveApp('config.yml') instead of refrence from paths. */
const docsConfig = resolveApp('config.yml')

/**
 * get docs config, see https://github.com/nodeca/js-yaml/blob/2d1fbed8f3a76ff93cccb9a8a418b4c4a482d3d9/lib/js-yaml/loader.js#L1590-L1592
 */
const getDocsConfig = () => {
  if (!fs.existsSync(docsConfig)) {
    return null
  }
  return yaml.safeLoad(fs.readFileSync(docsConfig))
}

/**
 * replace file content for Front-matter
 * path: file path
 * source?: source content
 * target: target content
 */
const replaceForFrontMatter = ({
  path,
  source,
  target
}) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(`❎ readFileContent error in ${path}`)
      return
    }
    console.log(`✅ readFileContent success in ${path}`)
    const replaceResult = source
      ? data.toString().replace(source, target)
      : `${target}\n${data.toString()}`
    fs.writeFile(path, replaceResult, (err) => {
      if (err) {
        console.log(`❎ writeFileContent error in ${path}`)
        return
      }
    })
    console.log(`✅ writeFileContent success in ${path}`)
  })
}

// generate a random string, length of it is n.
const generateRandomId = (n) => {
  const str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ""
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 35)
    res += str[id]
  }
  return res
}

module.exports = {
  resolveApp,
  resolveTool,
  getDocsConfig,
  replaceForFrontMatter,
  generateRandomId,
  // common paths
  docsGitIgnore: resolveApp('.gitignore'),
  docsBase: resolveApp(''),
  docsConfig,
  docsReadme: resolveApp('README.md'),
  docsBuildDist: resolveApp('.crd-dist'),
  cacheDirPath: resolveApp('.cache'),
  searchFilePath: resolveApp('.cache/search.js'),
  templatePath: resolveApp('node_modules/crd-templates'),
  defaultHTMLPath: resolveApp('node_modules/crd-theme/index.html'),
}
