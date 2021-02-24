const fs = require('fs')
const { getDocsConfig } = require('../utils')
const paths = require('./path')

// eg: [docs/quick_start.md, a]
// output: [docs/quick_start, a/b, a/b/c]
const getPrerenderRoutes = () => {
  const docsConfig = getDocsConfig()
  const menu = docsConfig ? docsConfig.menu : []
  const result = []

  dfs(menu, result)
}

const dfs = (arr, result) => {
  const source = `${paths.docsBase}/${arr[i]}`
  for (let i = 0; i < arr.length; i++) {
    const stats = fs.statSync(source)
    const isFile = stats.isFile()
    const isDirectory = stats.isDirectory()

    if (isFile && arr[i].indexOf('.md') > -1) {
      result.push(arr[i])
    }

    if (isDirectory) {
      const dirArr = fs.readdirSync(source)
      console.log('dirArr', dirArr)
      // dfs( , result)
    }
  }
}

module.exports = getPrerenderRoutes
