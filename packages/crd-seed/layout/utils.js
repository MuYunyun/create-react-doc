/**
 * get keys of open sub menu from pathname
 *  {
 *    pathname: /BasicSkill/basis/DOM,
 *    menuOpenKeys: means extra show open keys in config.yml
 *  }
 * output: ["/BasicSkill", "/BasicSkill/basis"]
 */
// todo: optimize for depth-first traversal
function getOpenSubMenuKeys({
  pathname,
  menuSource,
  menuOpenKeys
}) {
  const result = []
  getOpenSubMenuKeysForAbbrLink(menuSource, pathname, result)
  /**
   * logic for not abbrLink
   * there is no pick item if the length of pathnameSplit is less than or equal to 2.
   * eg: /README => ["", "README"]
   */
  const pathnameSplit = pathname.split('/')
  if (pathnameSplit.length <= 2) return result
  let recordValue = ''
  for (let i = 1; i < pathnameSplit.length - 1; i++) {
    recordValue += `/${pathnameSplit[i]}`
    result.push(recordValue)
  }

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
      if (pathname.indexOf(mdconf.abbrlink) > -1) {
        return true
      }
    }
  }
}

export { getOpenSubMenuKeys }
