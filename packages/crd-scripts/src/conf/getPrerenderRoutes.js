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
  return dirTree
}

// eg: ['docs/quick_start.md', 'a']
// output: ['/quick_start', '/a/b', '/a/b/c']
const getPrerenderRoutes = (dirTree) => {
  const result = getPrerenderRoute(dirTree)
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
        // eslint-disable-next-line no-unused-vars
        item.children = recursive(item.children, composeRouteName, arr)
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
