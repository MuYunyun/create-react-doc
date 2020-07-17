const DirectoryTree = require('directory-tree-md');
const write = require('write');
const path = require('path');
const fs = require('fs');
const paths = require('../conf/path');
const { ifInGitIgnore } = require('./index');

function restRuctureMarkdown(items, arr = []) {
  items.forEach((item) => {
    if (item.type === 'directory') {
      restRuctureMarkdown(item.children, arr);
    } else if (/\.md$/.test(item.path)) {
      // console.log('item.path', item.path);
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
  console.log('treeData', treeData);
  // 缓存 Markdown 存储 Markdown
  // Markdown 文件命名规则 `文件夹__文件夹__Markdown名.md`
  const flatTreeData = restRuctureMarkdown(treeData);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < flatTreeData.length; i++) {
    const mdfile = flatTreeData[i];
    const mdfilePathInProject = mdfile.replace(
      process.cwd() + path.sep,
      ''
    );
    // generate file cache only it isn't in .gitignore
    if (!ifInGitIgnore(mdfilePathInProject)) {
      const underlineFileName = mdfilePathInProject.split(path.sep).join('___');
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
    }
  }
  cb();
};
