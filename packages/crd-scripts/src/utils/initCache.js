const write = require('write')
const path = require('path')
const { cacheDirPath, getDocsConfig } = require('crd-utils')
const { directoryTree } = require('../conf/node-directory-tree')

module.exports = function (program, cb) {
  const treeData = program.markdownPaths.map((markdownPath) => {
    return directoryTree({
      path: markdownPath,
      options: {
        mdconf: true, // Markdown config for exsiting file.
        extensions: /\.md/,
      },
    })
  })
  // to collect search data
  const searchData = []
  const docsConfig = getDocsConfig()
  const useSearchPlugin = docsConfig.search && docsConfig.host

  function dfsMap(data) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        dfsMap(data[i].children)
      } else {
        const searchMapKeys = docsConfig.search_map ? Object.keys(docsConfig.search_map) : []
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < searchMapKeys.length; x++) {
          if (data[i].relative) {
            const searchMapIndex = data[i].relative.indexOf(searchMapKeys[x])
            if (searchMapIndex !== -1 && typeof searchMapIndex === 'number') {
              const effectedPath = data[i].relative.replace(
                searchMapKeys[x],
                docsConfig.search_map[searchMapKeys[x]],
              )
              searchData.push({
                title: data[i].name,
                url: `${effectedPath.replace(/.md/g, '')}`,
                content: data[i].content,
              })
              break
            }
          }
        }
      }
    }
  }
  if (useSearchPlugin) {
    // README
    searchData.push({
      title: 'README',
      url: 'README',
      content: treeData[0].content,
    })
    // map treeData to generate search data source
    dfsMap(treeData)
    const writeSearchPath = path.resolve(
      process.cwd(),
      cacheDirPath,
      'search.js',
    )
    write.sync(
      writeSearchPath,
      `${JSON.stringify(
        searchData,
      )}`,
    )
  }
  cb()
}
