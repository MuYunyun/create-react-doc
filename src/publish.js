const FS = require('fs');
const ghpages = require('gh-pages');
const loading = require('loading-cli');

const log = console.log; // eslint-disable-line

module.exports = function server(cmd) {
  if (!FS.existsSync(cmd.output)) {
    log(`You need to run the ${`\"npm run build\"`.yellow} command.`); // eslint-disable-line
    log(`The ${(cmd.output).red} folder does net exist!\n`);
    return;
  }

  log('  Start public to your git repo'.green);
  log(`  ${cmd.publish}\n`.green);
  const load = loading({
    text: 'Please wait ...'.blue,
    color: 'blue',
    interval: 100,
    stream: process.stdout,
  }).start();

  ghpages.publish(cmd.output, {
    branch: cmd.branch,
    repo: cmd.publish,
    message: `Update website, ${new Date()}!`,
  }, (err) => {
    load.stop();
    if (err) {
      return log(err);
    }
    log(`\n  Push to ${cmd.branch} success!\n`.green.bold);
  });
};

