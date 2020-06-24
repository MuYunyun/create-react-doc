const FS = require('fs');
const paths = require('../conf/path');

/**
 * judege cur file if in git ignore.
 */
exports.ifInGitIgnore = (mdfilePathInProject) => {
  let gitIgnoreContentArr = [];
  if (FS.existsSync(paths.appGitIgnore)) {
    const gitIgnoreContent = FS.readFileSync(paths.appGitIgnore);
    gitIgnoreContentArr = gitIgnoreContent.toString().split('\n');
  }
  return gitIgnoreContentArr.indexOf(mdfilePathInProject) > -1;
};

/**
 * to get dight from cur dir.
 * If there are order && unorder file in one same folder, the unorder file'll be in front of order file.
 * eg:
 *  '1.xx' => 1
 *  'xx' => 0
 */
exports.getDigitFromDir = (dir) => {
  const matchedResult = dir.match(/^((\d)*)\.(\s|\S)*$/);
  if (matchedResult && matchedResult[1]) {
    return parseInt(matchedResult[1], 10);
  }
  return 0;
};
