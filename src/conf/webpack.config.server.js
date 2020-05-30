const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = (cmd, webpackConf) => {
  return {
    // 启用生成文件的gzip压缩。
    compress: true,
    // 沉默WebpackDevServer自己的日志，因为它们通常没有用处。
    // 这个设置仍然会显示编译警告和错误。
    clientLogLevel: 'none',
    // contentBase: conf.output.appPublic,
    publicPath: webpackConf.output.publicPath,
    hot: true,
    historyApiFallback: {
      // 带点的路径仍应使用历史回退。
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    // historyApiFallback: true,
    // WebpackDevServer默认是嘈杂的，所以我们发出自定义消息
    // 通过上面的`compiler.plugin`调用来监听编译器事件。
    quiet: true,
    // 如果HTTPS环境变量设置为“true”，则启用HTTPS
    https: protocol === 'https',
    // 告诉服务器从哪里提供内容。提供静态文件，这只是必要的。
    contentBase: cmd.markdownPaths,
    // 通知服务器观察由devServer.contentBase选项提供的文件。
    // 文件更改将触发整页重新加载。
    watchContentBase: true,
    // 这样可以避免某些系统的CPU过载。
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
