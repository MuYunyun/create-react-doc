const path = require('path');
const fs = require('fs');

// handle the problem of symbol in any platform
const appDirectory = fs.realpathSync(process.cwd());
// Markdown dir
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,
};
