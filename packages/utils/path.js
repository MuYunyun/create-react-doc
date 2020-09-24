const path = require('path');
const fs = require('fs');

// handle the problem of symbol in any platform
const appDirectory = fs.realpathSync(process.cwd());
const toolDirectory = fs.realpathSync(__dirname);
// Markdown dir
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// crd tool dir
const resolveTool = relativePath => path.resolve(toolDirectory, relativePath);

module.exports = {
  resolveApp,
  resolveTool,
};
