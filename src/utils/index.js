const fs = require('fs');
const paths = require('../conf/path');

/**
 * judege cur file if in git ignore.
 */
exports.ifInGitIgnore = (mdfilePathInProject) => {
  let gitIgnoreContentArr = [];
  if (fs.existsSync(paths.docsGitIgnore)) {
    const gitIgnoreContent = fs.readFileSync(paths.docsGitIgnore);
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

function paddingTwoDigits(digit) {
  return digit < 10 ? `0${digit}` : digit;
}

/**
 * format time
 */
exports.timeFormat = (date) => {
  return `${date.getFullYear()}-${paddingTwoDigits(
    date.getMonth() + 1
  )}-${paddingTwoDigits(date.getDate())}`;
};
