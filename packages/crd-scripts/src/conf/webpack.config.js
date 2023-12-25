/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const webpack = require('webpack')
const webpackbar = require('webpackbar')
const fs = require('fs')
const { resolveApp, docsConfig, docsBuildDist } = require('crd-utils')
const { getDocsConfig } = require('crd-utils')
// const { getSearchContent } = require('../utils');
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const paths = require('./path')
const pkg = require('../../package.json')

const define = {
  FOOTER: null,
  DOCSCONFIG: null,
  INJECT: null,
}
if (paths.crdConf && paths.crdConf.footer && typeof paths.crdConf.footer === 'string') {
  define.FOOTER = JSON.stringify(paths.crdConf.footer)
}
/* custom define docs config */
if (docsConfig) {
  // const searchContent = getSearchContent();
  const docsConfigObj = getDocsConfig()
  define.DOCSCONFIG = JSON.stringify(docsConfigObj)
  // todo: searchContent affects the performance, so take annotation here templately.
  // define.SEARCHCONTENT = searchContent && searchContent.toString();

  // if there is inject logic in docsConfigObj
  if (docsConfigObj && docsConfigObj.inject && fs.existsSync(resolveApp(docsConfigObj.inject))) {
    define.INJECT = require(resolveApp(docsConfigObj.inject))
  }
}

module.exports = {
  entry: {},
  output: {
    path: docsBuildDist,
    publicPath: paths.publicPath,
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        // “oneOf”将遍历所有以下加载程序，直到一个符合要求。
        // 当没有加载器匹配时，它将返回到加载程序列表末尾的“file”加载器。
        oneOf: [
          {
            test: /\.(svg|png|bmp|jpg|jpeg|gif)$/,
            loader: require.resolve('url-replace-loader'),
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]',
              replace: [
                {
                  test: /crd\.logo\.svg$/,
                  path: paths.logoPath,
                },
              ],
            },
          },
          {
            test: /\.md$/,
            use: [
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
              {
                loader: require.resolve('@mdx-js/loader'),
                options: {
                  remarkPlugins: [
                    [
                      remarkMath,
                      {
                        /* options */
                      },
                    ],
                  ],
                  rehypePlugins: [
                    [
                      rehypeKatex,
                      {
                        /* options */
                      },
                    ],
                  ],
                },
              },
            ],
            exclude: /(node_modules)/,
          },
          // “file-loader”确保这些资源由WebpackDevServer服务。
          // 当您导入资源时，您将获得（虚拟）文件名。
          // 在生产中，它们将被复制到`build`文件夹。
          // 此加载程序不使用“test”，因此它将捕获所有模块
          {
            // 排除`js`文件以保持“css”加载器工作，因为它注入它的运行时，否则将通过“文件”加载器处理。
            // 还可以排除“html”和“json”扩展名，以便它们被webpacks内部加载器处理。
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line new-cap
    new webpackbar({ name: pkg.name }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      ...define,
    }),
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
}
