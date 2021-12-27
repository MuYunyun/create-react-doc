/**
 * get keys of open sub menu from pathname
 *  {
 *    pathname: pathname of location,
 *      when pathname is /9f41fc98, the result is ['/docs/主题'].
 *      when pathname is /测试/测试路由, the result is ['/docs/测试']
 *    menuOpenKeys: means extra show open keys in config.yml
 *  }
 */
function getOpenSubMenuKeys({
  pathname,
  menuSource,
  menuOpenKeys
}) {
  const result = []
  console.log('menuSource', menuSource)
  getOpenSubMenuKeysForAbbrLink(
    menuSource,
    decodeURI(pathname),
    result
  )

  /** default open menu from config.yml */
  if (menuOpenKeys) {
    result.push(...menuOpenKeys.split(','))
  }

  return result
}

function getOpenSubMenuKeysForAbbrLink(source, pathname, result) {
  for (let i = 0; i < source.length; i++) {
    const { type, path, mdconf } = source[i]
    if (type === 'directory') {
      result.push(path)
      const ifFind = getOpenSubMenuKeysForAbbrLink(source[i].children, pathname, result)
      if (ifFind) return true
      result.pop()
    } else {
      if (
        pathname.indexOf(mdconf.abbrlink) > -1           // used with abbrlink
        || (pathname.indexOf(source[i].routePath) > -1)  // used not with abbrlink
      ) {
        return true
      }
    }
  }
}

export { getOpenSubMenuKeys }
