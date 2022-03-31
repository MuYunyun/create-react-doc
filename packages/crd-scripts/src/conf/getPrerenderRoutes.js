const DirectoryTree = require('./node-directory-tree')

const getDirTree = (cmd) => {
  const dir = cmd.markdownPaths
  const dirs = Array.isArray(dir) ? dir : [dir]
  const otherProps = {
    mdconf: true,
    extensions: /\.md/,
    prerender: true,
  }
  const mapTagsWithArticle = []
  const dirTree = dirs.map(path => DirectoryTree({
    path,
    options: otherProps,
    mapTagsWithArticle
  }))

  return {
    dirTree,
    // map tags with path. [{ tagName: 'custom Tag 1', mapArticle: [{ path, name }]}]
    mapTagsWithArticle
  }
}

// eg: ['docs/quick_start.md', 'a']
// output: ['/quick_start', '/a/b', '/a/b/c']
const getPrerenderRoutes = (dirTree) => {
  const dpCloneDirTree = JSON.parse(JSON.stringify(dirTree))
  const result = recursiveDirTree(dpCloneDirTree)
  result.push('/404')
  result.push('/tags')
  return result
}

function recursiveDirTree(data) {
  return recursive(
    data,
    '',
    []
  )
}

function recursive(
  data,
  routePath,
  prerenderRouteArr,
) {
  data.forEach((item) => {
    const { mdconf } = item || {}
    const { abbrlink, tags } = mdconf || {}
    const composeRouteName = `${routePath}/${item.name}`.replace(/.md$/, '')

    if (item.type === 'directory') {
      if (item.children && item.children.length > 0) {
        item.children = recursive(
          item.children,
          composeRouteName,
          prerenderRouteArr,
        )
      } else {
        item.children = []
      }
    } else if (item.type === 'file') {
      const prerenderRouteName = abbrlink
        ? `/${abbrlink}`
        : composeRouteName
      prerenderRouteArr.push(prerenderRouteName)
    }
  })
  return prerenderRouteArr
}

module.exports = {
  getDirTree,
  getPrerenderRoutes
}
