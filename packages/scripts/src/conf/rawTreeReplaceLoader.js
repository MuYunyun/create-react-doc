const loaderUtils = require('loader-utils')
// fork https://github.com/react-doc/node-directory-tree-md/blob/master/lib/directory-tree-md.js
const DirectoryTree = require('./node-directory-tree')
const PATH = require('path')
const { ifInGitIgnore } = require('../utils/index')

// function getAllWatchPath(arr, pathArr = []) {
//   arr.forEach((item) => {
//     const mdfilePathInProject = item.path.replace(
//       process.cwd() + PATH.sep,
//       '',
//     )
//     if (!ifInGitIgnore(mdfilePathInProject) && item.type === 'file') {
//       pathArr.push(item.path)
//     }
//     if (item.children && item.children.length > 0) {
//       pathArr.concat(getAllWatchPath(item.children, pathArr))
//     }
//   })
//   return pathArr
// }

function replacePath(dirs, path) {
  for (let i = 0; i < dirs.length; i += 1) {
    const element = PATH.dirname(dirs[i])
    const reg = new RegExp(`^${element}`, 'gi')
    if (reg.test(path)) {
      path = path.replace(reg, '')
      break
    }
  }
  return path
}

function getRelativePath(arr, relativePath, dirs) {
  const pathArr = []
  arr.forEach((item) => {
    if (relativePath && item.path) {
      item.path = replacePath(dirs, item.path)
    }
    if (item.children && item.children.length > 0) {
      item.children = getRelativePath(item.children, relativePath, dirs)
    }
    const notInGitIgnore = !ifInGitIgnore(item.path.replace(PATH.sep, ''))
    if (notInGitIgnore) {
      pathArr.push(item)
    }
  })
  return pathArr
}

module.exports = function (source) {
  const options = loaderUtils.getOptions(this) || {}
  const { include, directoryTrees } = options
  const { dir, relativePath, ...otherProps } = directoryTrees
  let content = typeof source === 'string' ? JSON.parse(source) : source

  if (this.cacheable) this.cacheable()
  if (directoryTrees && (!include || include.test(this.resourcePath))) {
    const dirs = Array.isArray(dir) ? dir : [dir]
    const dirTree = dirs.map(path => DirectoryTree(path, otherProps))
    // content = dirTree

    // const filemd = getAllWatchPath(dirTree)
    // filemd.forEach((fileItem) => {
    //   this.addDependency(fileItem)
    // })
    content = getRelativePath(
      dirTree,
      relativePath,
      dirs,
    )
    console.log('content', content)
  }
  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return `module.exports = ${content}`
}
