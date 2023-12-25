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
  getPrerenderRoutes
}
