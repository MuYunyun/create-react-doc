/**
 * get keys of open sub menu from pathname
 * input: /BasicSkill/basis/DOM
 * menuOpenKeys: means extra show open keys in config.yml
 * output: ["/BasicSkill", "/BasicSkill/basis"]
 */
function getOpenSubMenuKeys(pathname, menuOpenKeys) {
  const result = [];
  if (menuOpenKeys) {
    result.push(...menuOpenKeys.split(','));
  }
  /**
   * there is no pick item if the length of pathnameSplit is less than or equal to 2.
   * eg: /README => ["", "README"]
   */
  const pathnameSplit = pathname.split('/');
  if (pathnameSplit.length <= 2) return result;
  let recordValue = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < pathnameSplit.length - 1; i++) {
    recordValue += `/${pathnameSplit[i]}`;
    result.push(recordValue);
  }
  return result;
}

export { getOpenSubMenuKeys };
