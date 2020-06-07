const DirectoryTree = require('directory-tree-md');
const write = require('write');
const PATH = require('path');
const FS = require('fs');
const paths = require('../conf/path');

function restRuctureMarkdown(items, arr = []) {
  items.forEach((item) => {
    if (item.type === 'directory') {
      restRuctureMarkdown(item.children, arr);
    } else if (/\.md$/.test(item.path)) {
      console.log('item.path', item.path);
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
  // 缓存 Markdown 存储 Markdown
  // Markdown 文件命名规则 `文件夹__文件夹__Markdown名.md`
  restRuctureMarkdown(treeData).forEach((mdfile) => {
    let writeMarkdownPath = PATH.resolve(process.cwd(), paths.cacheDirPath, 'md');
    const underlineFileName = mdfile.replace(process.cwd() + PATH.sep, '').split(PATH.sep).join('___');
    writeMarkdownPath = PATH.resolve(writeMarkdownPath, underlineFileName);
    if (FS.existsSync(mdfile)) {
      const content = FS.readFileSync(mdfile);
      write.sync(writeMarkdownPath, content);
    }
  });
  cb();
};
