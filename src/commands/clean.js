const FS = require('fs-extra');
const paths = require('../conf/path');

module.exports = function (params) {
  if (params.build && FS.pathExistsSync(paths.appBuildDist)) {
    // 清空目录
    FS.emptyDirSync(paths.appBuildDist);
  }
  if (params.clean && FS.pathExistsSync(paths.catchDirPath)) {
    // 清空目录
    FS.emptyDirSync(paths.catchDirPath);
  }
};
