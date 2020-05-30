const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowsers = require('open-browsers');
const detect = require('detect-port');
const prepareUrls = require('local-ip-url/prepareUrls');
const conf = require('./conf/webpack.config.dev');
const createDevServerConfig = require('./conf/webpack.config.server');
require('colors-cli/toxic');

function clearConsole() {
  process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
}

module.exports = function server(cmd) {
  const HOST = cmd.host;
  let DEFAULT_PORT = cmd.port;
  const webpackConf = conf(cmd);
  const compiler = webpack(webpackConf);


  detect(DEFAULT_PORT).then((_port) => {
    if (DEFAULT_PORT !== _port) DEFAULT_PORT = _port;

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls({ protocol, host: HOST, port: DEFAULT_PORT });
    // https://webpack.js.org/api/compiler-hooks/#aftercompile
    // 编译完成之后打印日志
    compiler.hooks.done.tap('done', () => {
      /* eslint-disable */
      console.log(`Dev Server Listening at Local: ${urls.localUrl.green}`);
      console.log(`              On Your Network: ${urls.lanUrl.green}`);
      console.log(`\nTo create a production build, use ${'npm run build'.blue_bt}.`);
      /* eslint-enable */
    });

    new WebpackDevServer(compiler, createDevServerConfig(cmd, webpackConf)).listen(DEFAULT_PORT, HOST, (err) => {
      if (err) {
        return console.log(err); // eslint-disable-line
      }
      clearConsole();
      // open browser
      openBrowsers(urls.localUrl);
    });
  }).catch((err) => {
    console.log(err); // eslint-disable-line
  });
};
