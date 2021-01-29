const autoprefixer = require('autoprefixer')
const path = require('path')
const upath = require('upath')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyMarkdownImageWebpackPlugin = require('copy-markdown-image-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { getDocsConfig } = require('../utils')
const CreateSpareWebpackPlugin = require('./createSpareWebpackPlugin')
const config = require('./webpack.config')
const paths = require('./path')

module.exports = function (cmd) {
  const docsConfig = getDocsConfig()
  config.mode = 'production'
  config.entry = [paths.appIndexJs]
  config.output.filename = 'js/[hash:8].js'
  config.output.chunkFilename = 'js/[name].[hash:8].js'
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
            loader: require.resolve('babel-loader'),
            options: require('../../.babelrc'), // eslint-disable-line
          },
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
              include: /crd\.json$/, // 检查包含的文件名字
              directoryTrees: {
                // 指定目录生成目录树，json
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
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]',
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
                require('postcss-flexbugs-fixes'), // eslint-disable-line
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
    // minimize: true,
    // minimizer: [
    //   // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    //   // `...`,
    //   new CssMinimizerPlugin(),
    // ],
  }

  config.plugins = config.plugins.concat([
    new HtmlWebpackPlugin({
      inject: true,
      favicon: paths.defaultFaviconPath,
      template: paths.defaultHTMLPath,
      title:
        docsConfig && docsConfig.title ? docsConfig.title : 'Create React Doc',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new CopyMarkdownImageWebpackPlugin({
      dir: cmd.markdownPaths,
      toDir: config.output.path,
    }),
    new CreateSpareWebpackPlugin({
      // 备用文件目录，比对是否存在，不存在生成，根据sep 目录规则生成
      path: path.join(paths.cacheDirPath, './md'),
      sep: '___', // 检查目标目录文件，文件名存储，文件夹+下划线间隔+文件名
      directoryTrees: {
        // 索引目录
        dir: cmd.markdownPaths,
        mdconf: true,
        extensions: /\.md$/,
      },
    }),
    // new webpack.optimize.DedupePlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[contenthash].css',
      chunkFilename: 'css/[id].css',
    }),
  ])
  return config
}
