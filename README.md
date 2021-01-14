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

[English](./README-en.md) | 简体中文

# Create React Doc

[Create React Doc](https://github.com/MuYunyun/create-react-doc) 是一个使用 React 的 markdown 文档站点生成工具。就像 [create-react-app](https://github.com/facebook/create-react-app) 一样，开发者可以使用 Create React Doc 来开发、部署 markdown 站点或者博客而无需关心站点环境配置信息。

## 特性

* 建站理念: 文件即站点 (Files as a Site)。
* 开箱即用: 一键生成可运行文档站点, 无需关心站点环境配置信息。
* 性能: 文档支持懒加载提升站点加载速度。
* 工作流: 集成 Github action, 自动化打包、发布站点。

> [快速上手](http://muyunyun.cn/create-react-doc/#/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)

## 主题

当前默认使用的主题是 [crd-seed](https://github.com/MuYunyun/create-react-doc/tree/main/packages/theme/internal-theme/crd-seed)。

使用该主题搭建的站点

* [blog](http://muyunyun.cn/blog)
  * ![](http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg)
  * ![](http://with.muyunyun.cn/2e7440e4256debda2d73a4e6392c7146.jpg-300)
* [diana](https://muyunyun.cn/diana/)

> 如果你的产品从中受益，欢迎<a href="https://github.com/MuYunyun/create-react-doc/issues/new" target="_blank">留言补充</a>

## 快速上手

**create-react-doc** 非常容易上手。开发者不需要额外安装或配置 webpack 或者 Babel 等工具，它们被内置隐藏在脚手架中，因此开发者可以专心于文档的书写。

如果你想在当前文件下建立站点文件 `doc`, 这里提供如下三种方式快速建站:

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

> 如果想把模板内容内容拉取到当前文件夹, 则可以将如上命令的 `doc` 替换为 `.`, 比如执行 `npx create-react-doc .`。

接着执行 `cd doc && yarn && yarn start`, 可以在 `localhost: 3000` 预览站点, 如果站点文档发生改变, 站点将自动重新加载。

<img src="http://with.muyunyun.cn/2bbd4d8da3165e1a09a88f5e6a114009.jpg" width="900" />

## 站点发布

在 [快速上手](http://muyunyun.cn/create-react-doc/#/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B) 一节中介绍了如何快速搭建站点, 本节将介绍如何将搭建好的站点打包、发布到 gh-pages。

### 自动打包发布到 gh-pages (推荐)

初始化的模板项目集成了 `Github action` 的 [ci 配置](https://github.com/MuYunyun/create-react-doc/blob/main/packages/templates/default/.github/workflows/gh-pages.yml), 使用方只需在 main 分支执行 `git push` 即可以完成站点的自动部署。

![](http://with.muyunyun.cn/ea24d511f76efe5ba5d13bb6b1609aac.jpg)

如果是第一次部署, 在执行以下操作后, 需要在项目的 setting 选项卡中将 Github Pages 选择为 gh-pages。(详情见 [First Deployment with GITHUB_TOKEN](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token))

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/用户或组织名/项目名.git
git push -u origin main
```

> 更多内容可以访问 [站点发布](http://muyunyun.cn/create-react-doc/#/%E7%AB%99%E7%82%B9%E5%8F%91%E5%B8%83)、[高阶用法](http://muyunyun.cn/create-react-doc/#/%E9%AB%98%E9%98%B6%E7%94%A8%E6%B3%95)、[其它工具](http://muyunyun.cn/create-react-doc/#/%E5%85%B6%E5%AE%83%E5%B7%A5%E5%85%B7)。
