const FS = require('fs');
const paths = require('../conf/path');

exports.ifInGitIgnore = (mdfilePathInProject) => {
  let gitIgnoreContentArr = [];
  if (FS.existsSync(paths.appGitIgnore)) {
    const gitIgnoreContent = FS.readFileSync(paths.appGitIgnore);
    gitIgnoreContentArr = gitIgnoreContent.toString().split('\n');
  }
  return gitIgnoreContentArr.indexOf(mdfilePathInProject) > -1;
};
