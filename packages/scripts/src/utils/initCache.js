const write = require('write')
const path = require('path')
const fs = require('fs')
const { cacheDirPath, getDocsConfig } = require('crd-utils')
const DirectoryTree = require('../conf/node-directory-tree')
const { ifInGitIgnore } = require('./index')

function restRuctureMarkdown(items, arr = []) {
  items.forEach((item) => {
    if (item.type === 'directory') {
      restRuctureMarkdown(item.children, arr)
    } else if (/\.md$/.test(item.path)) {
      arr.push(item.path)
    }
  })
  return arr
}

module.exports = function (program, cb) {
  const treeData = program.markdownPaths.map((markdownPath) => {
    return DirectoryTree(markdownPath, {
      mdconf: true, // 存在 Markdown 设置
      extensions: /\.md/,
    })
  })
  // cache Markdown, Markdown file name rule: `folder__folder__Markdown name.md`
  const flatTreeData = restRuctureMarkdown(treeData)
  // to collect search data
  const searchData = []
  const docsConfig = getDocsConfig()
  const useSearchPlugin = docsConfig.search && docsConfig.host
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < flatTreeData.length; i++) {
    const mdfile = flatTreeData[i]
    // const mdfilePath = mdfile.replace(
    //   process.cwd() + path.sep,
    //   '',
    // )
    // generate file cache only it isn't in .gitignore
    // if (!ifInGitIgnore(mdfilePath)) {
    //   // todo: remove ___
    //   const underlineFileName = mdfilePath.split(path.sep).join('___')
    //   const writeMarkdownPath = path.resolve(
    //     process.cwd(),
    //     cacheDirPath,
    //     'md',
    //     underlineFileName,
    //   )
    //   if (fs.existsSync(mdfile)) {
    //     const content = fs.readFileSync(mdfile)
    //     write.sync(writeMarkdownPath, content)
    //   }
    // }
  }

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
