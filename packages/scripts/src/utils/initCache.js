const write = require('write');
const path = require('path');
const fs = require('fs');
const DirectoryTree = require('../conf/node-directory-tree');
const paths = require('../conf/path');
const { ifInGitIgnore, getDocsConfig } = require('./index');

function restRuctureMarkdown(items, arr = []) {
  items.forEach((item) => {
    if (item.type === 'directory') {
      restRuctureMarkdown(item.children, arr);
    } else if (/\.md$/.test(item.path)) {
      arr.push(item.path);
    }
  });
  return arr;
}

module.exports = function (program, cb) {
  const treeData = program.markdownPaths.map((path) => {
    return DirectoryTree(path, {
      mdconf: true, // 存在 Markdown 设置
      extensions: /\.md/,
    });
  });
  // cache Markdown, Markdown file name rule: `folder__folder__Markdown name.md`
  const flatTreeData = restRuctureMarkdown(treeData);
  // to collect search data
  const searchData = [];
  const docsConfig = getDocsConfig();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < flatTreeData.length; i++) {
    const mdfile = flatTreeData[i];
    const mdfilePath = mdfile.replace(
      process.cwd() + path.sep,
      ''
    );
    // generate file cache only it isn't in .gitignore
    if (!ifInGitIgnore(mdfilePath)) {
      const underlineFileName = mdfilePath.split(path.sep).join('___');
      let writeMarkdownPath = path.resolve(
        process.cwd(),
        paths.cacheDirPath,
        'md'
      );
      writeMarkdownPath = path.resolve(writeMarkdownPath, underlineFileName);
      if (fs.existsSync(mdfile)) {
        const content = fs.readFileSync(mdfile);
        write.sync(writeMarkdownPath, content);
      }

      // generate search data source
      if (mdfile && docsConfig.search && docsConfig.host) {
        searchData.push({
          title: mdfile.name,
          // to fill
          url: `${docsConfig.host}/${docsConfig.repo}/#${docsConfig.relative}`,
          content: mdfile.content,
        });
      }
    }
  }
  cb();
};
