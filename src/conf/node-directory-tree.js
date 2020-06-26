/* eslint-disable no-undef */
const fs = require('fs');
const PATH = require('path');
const YAML = require('yamljs');
const { execSync } = require('child_process');
const { getDigitFromDir, timeFormat } = require('../utils');

const constants = {
  DIRECTORY: 'directory',
  FILE: 'file',
};

function safeReadDirSync(path) {
  let dirData = {};
  try {
    /**
     * to make sure it's ordered like such rules, link issue: https://github.com/nodejs/node/issues/3232
     * 1.x                  1.x
     * 2.x    instead of   10.x
     * 10.x                 2.x
     */
    dirData = fs.readdirSync(path).sort((dir1, dir2) => {
      const dir1Digit = getDigitFromDir(dir1);
      const dir2Digit = getDigitFromDir(dir2);
      if (dir1Digit && dir2Digit) {
        return dir1Digit - dir2Digit;
      }
      return 0;
    });
  } catch (ex) {
    if (ex.code === 'EACCES')
    // User does not have permissions, ignore directory
    // eslint-disable-next-line brace-style
    { return null; }
    throw ex;
  }
  return dirData;
}

function directoryTree(path, options, onEachFile) {
  const name = PATH.basename(path);
  const item = { path, name };
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (e) {
    return null;
  }

  // Skip if it matches the exclude regex
  if (options && options.exclude && options.exclude.test(path)) return null;

  if (stats.isFile()) {
    const ext = PATH.extname(path).toLowerCase();

    // Skip if it does not match the extension regex
    if (options && options.extensions && !options.extensions.test(ext)) { return null; }

    if (options && options.mdconf) {
      const contentStr = fs.readFileSync(path).toString();
      if (contentStr) {
        const contentMatch = contentStr.match(/^<!--(\s?[^>]*)-->/);
        item.relative = item.path.replace(process.cwd(), '');
        item.mdconf = contentMatch ? YAML.parse(contentMatch[1]) : {};
        item.isEmpty = contentMatch
          ? !String.prototype.trim.call(contentStr.replace(contentMatch[0], ''))
          : true;
        try {
          // see https://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository/2390382#2390382
          const result = execSync(`git log --format=%aD ${path} | tail -1`);
          console.log('result1', result);
          item.birthtime =
            Buffer.isBuffer(result) && timeFormat(new Date(result));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`error: ${error.message}`);
        }
        try {
          // see https://stackoverflow.com/questions/22497597/get-the-last-modification-data-of-a-file-in-git-repo
          const result = execSync(`git log -1 --pretty="format:%ci" ${path}`);
          console.log('result2', result);
          item.mtime = Buffer.isBuffer(result) && timeFormat(new Date(result));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`error: ${error.message}`);
        }
      }
    }

    item.size = stats.size; // File size in bytes
    item.extension = ext;
    item.type = constants.FILE;
    if (onEachFile) {
      onEachFile(item, PATH);
    }
  } else if (stats.isDirectory()) {
    const dirData = safeReadDirSync(path);
    if (dirData === null) return null;

    item.children = dirData
      .map(child =>
        directoryTree(PATH.join(path, child), options, onEachFile)
      )
      .filter(e => !!e);
    item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
    item.type = constants.DIRECTORY;
  } else {
    return null; // Or set item.size = 0 for devices, FIFO and sockets ?
  }
  return item;
}

module.exports = directoryTree;
