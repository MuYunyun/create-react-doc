const DirectoryTree = require('directory-tree-md');
const PATH = require('path');
const UPATH = require('upath');
const write = require('write');
const FS = require('fs');
const { ifInGitIgnore } = require('../utils/index');

function getAllWatchPath(arr, pathArr = []) {
  arr.forEach((item) => {
    if (item.type === 'file') {
      const mdfilePathInProject = item.path.replace(
        process.cwd() + PATH.sep,
        ''
      );
      if (!ifInGitIgnore(mdfilePathInProject)) {
        pathArr.push(item.path);
      }
    // eslint-disable-next-line brace-style
    }
    // todo: gitignore to handle file dir
    else if (item.children && item.children.length > 0) {
      pathArr.concat(getAllWatchPath(item.children, pathArr));
    }
  });
  return pathArr;
}

module.exports = class CopySpareWebpackPlugin {
  constructor(options) {
    this.option = options;
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync(
      this.constructor.name,
      (compilation, callback) => {
        const { path, sep, directoryTrees } = this.option;
        const { dir, ...otherOtions } = directoryTrees;
        let fileItems = [];
        if (Array.isArray(dir)) {
          fileItems = dir.map(filepath =>
            DirectoryTree(filepath, otherOtions)
          );
        } else {
          fileItems = DirectoryTree(dir, otherOtions);
        }
        const filemds = getAllWatchPath(fileItems);
        filemds.forEach((filePathItem) => {
          const currentPath = UPATH.normalizeSafe(filePathItem);
          if (sep) {
            filePathItem = filePathItem
              .replace(process.cwd() + PATH.sep, '')
              .replace(/\//g, sep);
            filePathItem = PATH.resolve(path, filePathItem);
          }
          if (!FS.existsSync(filePathItem)) {
            if (this.addDependency) this.addDependency(currentPath);
            const content = FS.readFileSync(currentPath);
            write.sync(filePathItem, content);
          }
        });
        callback();
      }
    );
  }
};
