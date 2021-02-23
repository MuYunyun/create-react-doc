const autoprefixer = require('autoprefixer')
const path = require('path')
const upath = require('upath')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyMarkdownImageWebpackPlugin = require('copy-markdown-image-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PrerenderSPAPlugin = require('crd-prerender-spa-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs-extra')
const { getDocsConfig } = require('../utils')
const CreateSpareWebpackPlugin = require('./createSpareWebpackPlugin')
const config = require('./webpack.config')
const paths = require('./path')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = function (cmd) {
  const docsConfig = getDocsConfig()
  config.mode = 'production'
  config.entry = [paths.appIndexJs]
  // config.output.filename = 'js/[hash:8].js'
  // config.output.filename = 'static/js/[name].bundle.js'
  // config.output.chunkFilename = docsConfig.repo ? `${docsConfig.repo}/js/[name].[hash:8].js` : 'js/[name].[hash:8].js'
  config.output.chunkFilename = 'js/[name].[hash:8].js'
  config.output.publicPath = docsConfig.repo ? `/${docsConfig.repo}/` : '/'
  // config.output.publicPath = '/'
  config.output.path = docsConfig.repo ? `${paths.docsBuildDist}/${docsConfig.repo}` : paths.docsBuildDist

  // console.log('upath.normalizeSafe(paths.projectPath)', upath.normalizeSafe(paths.projectPath))
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
    new webpack.DefinePlugin({
      env: JSON.stringify('prod'),
    }),
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
      // filename: 'README/index.html',
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
      // filename: docsConfig.repo ? `${docsConfig.repo}/css/[contenthash].css` : 'css/[contenthash].css',
      // chunkFilename: docsConfig.repo ? `${docsConfig.repo}/css/[id].css` : 'css/[id].css',
    }),
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: paths.docsBuildDist,
      outputDir: docsConfig.repo ? `${paths.docsBuildDist}/${docsConfig.repo}` : paths.docsBuildDist,
      indexPath: docsConfig.repo ? `${paths.docsBuildDist}/${docsConfig.repo}/index.html` : `${paths.docsBuildDist}/index.html`,
      // Required - Routes to render.
      routes: ['/', '/README', '/快速上手', '/404'],
      successCb: async () => {
        if (docsConfig.repo) {
          await fs.move(`${paths.docsBuildDist}/${docsConfig.repo}`, paths.docsBuildDist)
          console.log('generate prerender file success!')
        }
      },
      // The actual renderer to use. (Feel free to write your own)
      // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
      renderer: new Renderer({
        // // Optional - The name of the property to add to the window object with the contents of `inject`.
        injectProperty: '__PRERENDER_INJECTED',
        // // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        inject: {
          prerender: true,
        },

        // // Optional - defaults to 0, no limit.
        // // Routes are rendered asynchronously.
        // // Use this to limit the number of routes rendered in parallel.
        maxConcurrentRoutes: 4,

        // // Optional - Wait to render until the specified event is dispatched on the document.
        // // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
        // renderAfterDocumentEvent: 'custom-render-trigger',

        // // Optional - Wait to render until the specified element is detected using `document.querySelector`
        // renderAfterElementExists: 'my-app-element',

        // // Optional - Wait to render until a certain amount of time has passed.
        // // NOT RECOMMENDED
        // renderAfterTime: 5000, // Wait 5 seconds.

        // Other puppeteer options.
        // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
        // headless: false // Display the browser window when rendering. Useful for debugging.
        // headless: false,
      }),
    }),
  ])
  return config
}
