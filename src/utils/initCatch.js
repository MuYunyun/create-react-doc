const DirectoryTree = require('directory-tree-md');
const write = require('write');
const PATH = require('path');
const FS = require('fs');
const paths = require('../conf/path');

function restRuctureMarkodwn(items, arr = []) {
  items.forEach((item) => {
    if (item.type === 'directory') {
      restRuctureMarkodwn(item.children, arr);
    } else if (/\.md$/.test(item.path)) {
      arr.push(item.path);
    }
  });
  return arr;
}

module.exports = function (program, cb) {
  const treeData = program.markdownPaths.map(path => DirectoryTree(path, {
    mdconf: true, // 存在Markdown设置
    extensions: /\.md/,
  }));

  // 缓存 Markdown 存储 Markdown
  // Markdown 文件命名规则 `文件夹__文件夹__Markdown名.md`
  restRuctureMarkodwn(treeData).forEach((mdfile) => {
    let writeMarkdownPath = PATH.resolve(process.cwd(), paths.catchDirPath, 'md');
    const underlineFileName = mdfile.replace(process.cwd() + PATH.sep, '').split(PATH.sep).join('___');
    writeMarkdownPath = PATH.resolve(writeMarkdownPath, underlineFileName);
    if (FS.existsSync(mdfile)) {
      const content = FS.readFileSync(mdfile);
      write.sync(writeMarkdownPath, content);
    }
  });
  cb();
};
