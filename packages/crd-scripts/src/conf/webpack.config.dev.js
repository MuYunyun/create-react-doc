const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
const upath = require('upath')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { defaultHTMLPath } = require('crd-utils')
const FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin')
const { getDocsConfig } = require('crd-utils')
const { getDirTree } = require('./getDirTree')
const config = require('./webpack.config')
const paths = require('./path')

module.exports = function (cmd) {
  const docsConfig = getDocsConfig()
  const { mapTagsWithArticle } = getDirTree(cmd)
  config.mode = 'development'
  config.devtool = 'eval-source-map'
  config.entry = [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-hot-dev-clients/webpackHotDevClient'),
    paths.appIndexJs,
  ]
  config.output.publicPath = '/'
  config.module.rules = config.module.rules.map((item) => {
    if (item.oneOf) {
      const loaders = []
      loaders.push({
        // Process JS with Babel.
        test: /\.(js|jsx)$/,
        exclude: paths.getExcludeFoldersRegExp.concat(/\.(cache)/),
        use: [
          {
            loader: require.resolve('string-replace-loader'),
            options: {
              multiple: [
                { search: '__project_root__', replace: upath.normalizeSafe(paths.projectPath), flags: 'ig' },
                { search: '__project_theme__', replace: upath.normalizeSafe(paths.defaultTheme), flags: 'ig' },
              ],
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
              // This will make esbuild automatically generate import statements,
              // making the ProviderPlugin unnecesary if used only for "react".
              // Note that this option makes sense only when used in conjuction
              // with React >16.40.0 || >17
              // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
              jsx: 'automatic',
            }
          },
          // {
          //   loader: require.resolve('babel-loader'),
          //   options: require('../../.babelrc'), // eslint-disable-line
          // },
        ],
      })
      // https://ilikekillnerds.com/2018/03/disable-webpack-4-native-json-loader/
      loaders.push({
        test: /crd\.json$/,
        // 禁用 Webpack 4 本身的 JSON 加载程序
        type: 'javascript/auto',
        use: [
          {
            loader: `${path.join(__dirname, './rawTreeReplaceLoader.js')}`,
            options: {
              include: /crd\.json$/,
              directoryTrees: {
                dir: cmd.markdownPaths,
                mdconf: true,
                extensions: /\.md/,
                relativePath: true,
              },
            },
          },
        ],
      })

      loaders.push({
        test: /\.(css|less)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require("postcss-flexbugs-fixes"), // eslint-disable-line
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve('less-loader'),
        ],
      })

      item.oneOf = loaders.concat(item.oneOf)
    }
    return item
  })

  config.optimization = {
    // 将模块名称添加到工厂功能，以便它们显示在浏览器分析器中。
    // 当接收到热更新信号时，在浏览器 console 控制台打印更多可读性高的模块名称等信息
    moduleIds: 'named',
  }

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      env: JSON.stringify('dev'),
      mapTagsWithArticle: JSON.stringify(mapTagsWithArticle)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: paths.defaultFaviconPath,
      template: defaultHTMLPath,
      title: docsConfig && docsConfig.title ? docsConfig.title : 'Create React Doc',
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
  ])
  return config
}
