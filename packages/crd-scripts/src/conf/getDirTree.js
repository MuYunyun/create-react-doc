const { directoryTree } = require('./node-directory-tree')

const getDirTree = (cmd) => {
  const dir = cmd.markdownPaths
  const dirs = Array.isArray(dir) ? dir : [dir]
  const otherProps = {
    mdconf: true,
    extensions: /\.md/,
    prerender: true,
  }
  const mapTagsWithArticle = []
  const dirTree = dirs.map(path => directoryTree({
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

module.exports = {
  getDirTree,
}
