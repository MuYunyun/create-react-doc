const DirectoryTree = require('./node-directory-tree')

const getDirTree = (cmd) => {
  const dir = cmd.markdownPaths
  const dirs = Array.isArray(dir) ? dir : [dir]
  const otherProps = {
    mdconf: true,
    extensions: /\.md/,
    prerender: true,
  }
  const dirTree = dirs.map(path => DirectoryTree({
    path,
    options: otherProps,
  }))
  // console.log('dirTree', dirTree)
  return dirTree
}

// eg: ['docs/quick_start.md', 'a']
// output: ['/quick_start', '/a/b', '/a/b/c']
const getPrerenderRoutes = (dirTree) => {
  const dpCloneDirTree = JSON.parse(JSON.stringify(dirTree))
  const result = getPrerenderRoute(dpCloneDirTree)
  result.push('/404')
  return result
}

function getPrerenderRoute(data) {
  const arr = []
  return recursive(data, '', arr)
}

function recursive(data, routePath, arr) {
  data.forEach((item) => {
    const { mdconf } = item || {}
    const { abbrlink } = mdconf || {}
    const composeRouteName = `${routePath}/${item.name}`.replace(/.md$/, '')

    if (item.type === 'directory') {
      if (item.children && item.children.length > 0) {
        // todo: judge if use deep clone to isolate them.
        // item.children = recursive(item.children, composeRouteName, arr)
      } else {
        item.children = []
      }
    } else if (item.type === 'file') {
      const prerenderRouteName = abbrlink
        ? `/${abbrlink}`
        : composeRouteName
      arr.push(prerenderRouteName)
    }
  })
  return arr
}

module.exports = {
  getDirTree,
  getPrerenderRoutes
}
