const ghpages = require('gh-pages')
const loading = require('loading-cli')

const log = console.log; // eslint-disable-line

module.exports = function server(cmd, docsConfig) {
  if (!docsConfig) {
    console.log('please check config.yml in root dir!\n')
    return
  }
  if (!docsConfig.user || !docsConfig.repo) {
    console.log('please check user and repo in config.yml!\n')
    return
  }
  const { user, repo, publish } = docsConfig
  log('  Start deploy to your git repo'.green)
  const load = loading({
    text: 'Please wait ...'.blue,
    color: 'blue',
    interval: 100,
    stream: process.stdout,
  }).start()

  ghpages.publish(
    cmd.output,
    {
      branch: cmd.branch,
      repo: publish || `https://github.com/${user}/${repo}.git`,
      message: `Update website, ${new Date()}!`,
    },
    (err) => {
      load.stop()
      if (err) {
        return log(err)
      }
      log(`\n  Push to ${cmd.branch} success!\n`.green.bold)
    },
  )
}

