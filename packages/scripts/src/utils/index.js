const fs = require('fs')
const yaml = require('js-yaml')
const { resolveApp } = require('crd-utils')
const paths = require('../conf/path')

/**
 * judege cur file if in git ignore.
 */
exports.ifInGitIgnore = (mdfilePathInProject) => {
  let gitIgnoreContentArr = []
  if (fs.existsSync(paths.docsGitIgnore)) {
    const gitIgnoreContent = fs.readFileSync(paths.docsGitIgnore)
    gitIgnoreContentArr = gitIgnoreContent.toString().split('\n')
  }
  return gitIgnoreContentArr.indexOf(mdfilePathInProject) > -1
}

/**
 * to get dight from cur dir.
 * If there are order && unorder file in one same folder, the unorder file'll be in front of order file.
 * eg:
 *  '1.xx' => 1
 *  'xx' => 0
 */
exports.getDigitFromDir = (dir) => {
  const matchedResult = dir.match(/^((\d)*)\.(\s|\S)*$/)
  if (matchedResult && matchedResult[1]) {
    return parseInt(matchedResult[1], 10)
  }
  return 0
}

function paddingTwoDigits(digit) {
  return digit < 10 ? `0${digit}` : digit
}

/**
 * format time
 */
exports.timeFormat = (date) => {
  if (isNaN(date.getFullYear()) || isNaN(date.getMonth()) || isNaN(date.getDate())) return null
  return `${date.getFullYear()}-${paddingTwoDigits(
    date.getMonth() + 1,
  )}-${paddingTwoDigits(date.getDate())}`
}

/**
 * get docs config, see https://github.com/nodeca/js-yaml/blob/2d1fbed8f3a76ff93cccb9a8a418b4c4a482d3d9/lib/js-yaml/loader.js#L1590-L1592
 */
exports.getDocsConfig = () => {
  /* avoid reference loop, so use resolveApp('config.yml') instead of refrence from paths. */
  const docsConfig = resolveApp('config.yml')
  if (!fs.existsSync(docsConfig)) {
    return null
  }
  return yaml.safeLoad(fs.readFileSync(docsConfig))
}

exports.getSearchContent = () => {
  if (!fs.existsSync(paths.searchFilePath)) {
    console.log('there is no find .cache/search.js in root dir!\n')
    return null
  }
  return fs.readFileSync(paths.searchFilePath)
}

