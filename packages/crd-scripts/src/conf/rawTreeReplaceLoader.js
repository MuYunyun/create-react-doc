// A variation of https://github.com/react-doc/node-directory-tree-md/blob/master/lib/directory-tree-md.js
const { directoryTree } = require('./node-directory-tree')
const PATH = require('path')
const { ifInGitIgnore } = require('../utils/index')

function getAllWatchPath(arr, pathArr = []) {
  arr.forEach((item) => {
    const mdfilePathInProject = item.path.replace(
      process.cwd() + PATH.sep,
      '',
    )
    if (!ifInGitIgnore(mdfilePathInProject) && item.type === 'file') {
      pathArr.push(item.path)
    }
    if (item.children && item.children.length > 0) {
      pathArr.concat(getAllWatchPath(item.children, pathArr))
    }
  })
  return pathArr
}

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
  // get option config from webpack loader, here is https://github.com/MuYunyun/create-react-doc/blob/main/packages/scripts/src/conf/webpack.config.prod.js#L61-L70
  const options = this.getOptions() || {}
  const { include, directoryTrees } = options
  const { dir, relativePath, ...otherProps } = directoryTrees
  let content = typeof source === 'string' ? JSON.parse(source) : source
  // It's said loader resuls are flagged as cacheable. See https://webpack.js.org/api/loaders/#thiscacheable.
  // if (this.cacheable) this.cacheable()
  if (directoryTrees && (!include || include.test(this.resourcePath))) {
    const dirs = Array.isArray(dir) ? dir : [dir]
    const dirTree = dirs.map(path => directoryTree({
      path,
      options: otherProps,
    }))

    const filemd = getAllWatchPath(dirTree)
    filemd.forEach((fileItem) => {
      this.addDependency(fileItem)
    })
    // replace full file path with relative path
    content = getRelativePath(
      dirTree,
      relativePath,
      dirs,
    )
  }
  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return `module.exports = ${content}`
}
