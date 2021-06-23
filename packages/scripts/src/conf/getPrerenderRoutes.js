const fs = require('fs')
const { getDocsConfig } = require('crd-utils')
const DirectoryTree = require('./node-directory-tree')

// eg: ['docs/quick_start.md', 'a']
// output: ['/quick_start', '/a/b', '/a/b/c']
const getPrerenderRoutes = (cmd) => {
  const dir = cmd.markdownPaths
  console.log('dir123', dir)
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
  console.log('dirTree123', dirTree)
  const docsConfig = getDocsConfig()
  const menu = docsConfig && Array.isArray(docsConfig.menu)
    ? docsConfig.menu
    : []
  const result = ['/README', '/404']
  dfs(menu, result, '', true)
  // console.log('✅ result', result)
  return result
}

const dfs = (arr, result, prefix, isRoot) => {
  for (let i = 0; i < arr.length; i++) {
    const source = `${prefix}${arr[i]}`
    // console.log('source', source)
    const stats = fs.statSync(source)
    const isFile = stats.isFile()
    const isDirectory = stats.isDirectory()

    if (isDirectory) {
      const dirArr = fs.readdirSync(source)
      dfs(dirArr, result, `${source}/`, false)
    }

    if (isFile && arr[i].indexOf('.md') > -1) {
      if (isRoot) {
        // eg: 'a/b.md'
        const splitArr = arr[i].split('/')
        const lastSplitValue = splitArr[splitArr.length - 1]
        result.push(`/${lastSplitValue.split('.md')[0]}`)
      } else {
        result.push(`/${prefix}${arr[i].split('.md')[0]}`)
      }
    }
  }
}

module.exports = getPrerenderRoutes
