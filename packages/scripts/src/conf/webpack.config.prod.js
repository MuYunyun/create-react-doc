const autoprefixer = require('autoprefixer')
const path = require('path')
const upath = require('upath')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyMarkdownImageWebpackPlugin = require('copy-markdown-image-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PrerenderSPAPlugin = require('crd-prerender-spa-plugin')
const { generateSiteMap } = require('crd-generator-sitemap')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs-extra')
const { defaultHTMLPath, docsBuildDist } = require('crd-utils')
const { getDocsConfig } = require('crd-utils')
const config = require('./webpack.config')
const paths = require('./path')
const getPrerenderRoutes = require('./getPrerenderRoutes')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = function (cmd) {
  const docsConfig = getDocsConfig()
  config.mode = 'production'
  config.entry = [paths.appIndexJs]
  // config.output.filename = 'js/[hash:8].js'
  config.output.chunkFilename = 'js/[name].[hash:8].js'
  config.output.publicPath = docsConfig.repo ? `/${docsConfig.repo}/` : '/'
  config.output.path = docsConfig.repo ? `${docsBuildDist}/${docsConfig.repo}` : docsBuildDist

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

  const routes = getPrerenderRoutes(cmd)

  console.log('docsConfig.repo', docsConfig.repo,)
  console.log('outputDir', docsConfig.repo ? `${docsBuildDist}/${docsConfig.repo}` : docsBuildDist,)
  console.log('indexPath', docsConfig.repo ? `${docsBuildDist}/${docsConfig.repo}/index.html` : `${docsBuildDist}/index.html`,)
  console.log('routes', routes)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      env: JSON.stringify('prod'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: paths.defaultFaviconPath,
      template: defaultHTMLPath,
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
    // new webpack.optimize.DedupePlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[contenthash].css',
      chunkFilename: 'css/[id].css',
    }),
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: docsBuildDist,
      outputDir: docsConfig.repo
        ? `${docsBuildDist}/${docsConfig.repo}`
        : docsBuildDist,
      indexPath: docsConfig.repo
        ? `${docsBuildDist}/${docsConfig.repo}/index.html`
        : `${docsBuildDist}/index.html`,
      // Required - Routes to render.
      // routes,
      routes: [
        '/README', '/快速上手',
        '/hijkl', '/mnopq',
        '/404'
      ],
      successCb: async () => {
        if (docsConfig.repo) {
          // not use fs.move here or it'll throw error in github action
          await fs.copy(`${docsBuildDist}/${docsConfig.repo}`, docsBuildDist)
          await fs.remove(`${docsBuildDist}/${docsConfig.repo}`)
          // move README as root index.html
          await fs.copy(`${docsBuildDist}/README/index.html`, `${docsBuildDist}/index.html`)
          console.log('generate prerender file success!')
          if (docsConfig.seo) {
            if (docsConfig.seo.google) {
              fs.writeFileSync(`${docsBuildDist}/sitemap.xml`, generateSiteMap(routes))
            }
          }
          console.log('generate sitemap file success!')
        }
      },
      // The actual renderer to use. (Feel free to write your own)
      // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
      renderer: new Renderer({
        // Optional - The name of the property to add to the window object with the contents of `inject`.
        injectProperty: '__PRERENDER_INJECTED',
        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        inject: {
          prerender: true,
        },
        // Optional - defaults to 0, no limit.
        // Routes are rendered asynchronously.
        // Use this to limit the number of routes rendered in parallel.
        maxConcurrentRoutes: 4,
        // https://pptr.dev/#?product=Puppeteer&version=v5.5.0&show=api-pagegotourl-options
        navigationOptions: {
          timeout: 0
        }
      }),
    }),
  ])
  return config
}
