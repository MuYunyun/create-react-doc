#!/usr/bin/env node
const commander = require('commander')
const packageJson = require('../package.json')
const download = require('./download')
const logout = require('./logout')
const { login } = require('./leetcode')

commander.version(packageJson.version)

commander
  .command('download')
  .option('-a, --all', 'Download all your accepted code from LeetCode.')
  .description('Download your new accepted code from LeetCode.')
  .action(download)

commander
  .command('login')
  .description('Log in to your Leetcode account.')
  .action(login)

commander
  .command('logout')
  .description('Logout current LeetCode account')
  .description('Log out of current account.')
  .action(logout)

commander.parse(process.argv)
