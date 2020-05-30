const webpack = require('webpack');
const conf = require('./conf/webpack.config.prod');
require('colors-cli/toxic');

module.exports = function serve(program) {
  const webpackConf = conf(program);
  const compiler = webpack(webpackConf);
  compiler.run((err, stats) => {
    // 官方输出参数
    // https://webpack.js.org/configuration/stats/
    // https://github.com/webpack/webpack/issues/538#issuecomment-59586196
    /* eslint-disable */
    console.log(stats.toString({
      colors: true,
      children: false,
      chunks: false,
      modules: false,
      moduleTrace: false,
      warningsFilter: (warning) => {
        return true
      }
    }));
    /* eslint-enable */
  });
};
