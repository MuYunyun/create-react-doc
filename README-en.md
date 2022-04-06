                                                     _.-"\
                                                _.-"      \
                                              ,-"          \
                                              \    create    \
                                              \ \    react    \
                                              \ \      doc     \
                                                \ \         _.-;
                                                \ \    _.-"   :
                                                  \ \,-"    _.-"
                                                  \(   _.-"
                                                    `--"

[![npm version](https://img.shields.io/npm/v/create-react-doc)](https://badge.fury.io/js/create-react-doc)
[![week download](https://img.shields.io/npm/dw/create-react-doc.svg)](https://www.npmjs.com/package/create-react-doc)
![views](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views.svg)
![views](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views_per_week.svg)
![clones](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/clones_per_week.svg)
![LICENSE MIT](https://img.shields.io/npm/l/create-react-doc.svg)

English | [简体中文](./README.md)

# Create React Doc

[Create React Doc](https://github.com/MuYunyun/create-react-doc) is a markdown document site generation tool using React just like [create-react-app](https://github.com/facebook/create-react-app), developers can use Create React Doc to develop, deploy documents or blog sites without worrying about additional environment configuration information.

## Features

* The idea of ​​building a site: Just write markdown files as a blog site [like me](https://github.com/MuYunyun/blog).
* Out of box: One-click generation of documents and blog sites by specifying directories or documents, no need to care about site environment configuration information.
* Performance: greatly improve site loading speed through pre-rendering and lazy loading.
* Based on mdx: Support writing React components, mathematical formulas, etc. in markdown.
* Search engine optimization: Support SEO, making documents easier to search.
* Personalization: Support [custom theme](https://muyunyun.cn/create-react-doc/9f41fc98).
* Workflow: Integrate Github actions, support automated packaging and publishing sites.

> [Quick Start](https://muyunyun.cn/create-react-doc/290a4219)

## Subject

Create React Doc provides the official default theme [crd-seed](https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-seed). The theme supports the following features:

* Adapt to mobile and PC multi-terminal display.
* Support dark mode.
* The document supports embedded codepen, codesandbox.
* GitHub linkage.
* Support using tags to customize aggregate article content.

[my blog](http://muyunyun.cn/blog) is based [crd-seed](https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-seed) theme to build。

![](http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg)
![](http://with.muyunyun.cn/2e7440e4256debda2d73a4e6392c7146.jpg-300)

If you want to customize or share personal themes, you can refer to the [Custom Theme](https://muyunyun.cn/create-react-doc/9f41fc98) chapter.

## Get started quickly

**Create React Doc** is very easy to use. Developers don't need to install or configure additional tools such as webpack or Babel, they are built-in and hidden in the scaffolding, so developers can concentrate on document writing.

If you want to create a site file `doc` under the current file, here are three ways to quickly build a site:

### npx

```bash
npx create-react-doc doc
```

### npm

```bash
npm init create-react-doc doc
```

### yarn

```bash
yarn create react-doc doc
```

![](http://with.muyunyun.cn/0f0cf6e8cb68b18399eac2927f74b063.jpg)

> If you want to pull the content of the template to the current folder, you can replace the `doc` of the above command with `.`, such as executing `npx create-react-doc .`.

Then execute `cd doc && yarn && yarn start`, you can preview the site at `localhost: 3000`, if the site document changes, the site will automatically reload.

<img src="http://with.muyunyun.cn/2bbd4d8da3165e1a09a88f5e6a114009.jpg" width="900" />

## Site release

In the [Quick Start](http://muyunyun.cn/create-react-doc/QuickStart) section, it introduces how to quickly build a site. This section will introduce how to package and publish the built site to gh-pages.

### Automatically package and publish to gh-pages (recommended)

The initialized template project integrates the [ci configuration](https://github.com/MuYunyun/create-react-doc/blob/main/packages/templates/default/.github/workflows/gh-pages.yml) of `Github action`, the user only needs to execute `git push` on the main branch to complete the automatic deployment of the site.

![](http://with.muyunyun.cn/ea24d511f76efe5ba5d13bb6b1609aac.jpg)

If it is the first deployment, after performing the following operations, you need to select Github Pages as gh-pages in the setting tab of the project. (See [First Deployment with GITHUB_TOKEN](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token) for details)

```bash
git init
git add.
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/user or organization name/project name.git
git push -u origin main
```

> For more content, please visit [Site Release](http://muyunyun.cn/create-react-doc/SiteRelease), [Advanced Usage](http://muyunyun.cn/create-react-doc/HighOrderusage), [other tools](http://muyunyun.cn/create-react-doc/othertools) and other chapters.

## Practice Sharing

* [基于 SSR 的预渲染首屏直出方案](http://muyunyun.cn/blog/g3v1c5bq)
* [SEO 在 SPA 站点中的实践](http://muyunyun.cn/blog/ettzfags)
