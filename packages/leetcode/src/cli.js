#!/usr/bin/env node
const commander = require('commander');
const packageJson = require('../package.json');
const download = require('./download');

commander.version(packageJson.version);

commander
  .command('download')
  .option('-a, --all', 'Download all your accepted code from LeetCode.')
  .description('Download your new accepted code from LeetCode.')
  .action(download);

commander.parse(process.argv);
