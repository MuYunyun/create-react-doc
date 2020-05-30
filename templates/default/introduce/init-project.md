<!--
title: 快速开始
sort: 1
-->

Create React Doc 是一个文档生成工具，用于生成文档网站或简单的博客网站。<br/>简单到你只需写 Markdown 文件就可以帮助你生成网站。<br/>同时可以方便的集成到你的项目工程中。 是一套基于基于 [Webpack](https://webpack.js.org/)，[React](https://reactjs.org/)，[React Router](https://reacttraining.com/react-router/web/guides/philosophy) 封装的文档生成工具，用于生成React组件库文档或博客网站，

> 在开始之前，推荐先学习 Markdown语法，并正确安装和配置了 [Node.js](https://nodejs.org) v8.0 或以上。

下面教程，是最快速开始生成一个文档网站。你也可以通过 `入门` 一步一步配置一个初始工程。

1. 全局安装

```shell
$ npm install rdoc -g # 安装工具
## /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js
## /usr/local/bin/rdoc-cli -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js
```

2. 初始化工程

可以通过一条命令生成，一个初始文档网站工程。初始化工程，里面会包含一个 `package.json`，`rdoc` 工具会被当做依赖放入其中，避免 `rdoc` 工具升级带来的问题。

```shell
$ create-react-doc init my-project # 初始化项目
## or
$ create-react-doc-cli init my-project
## 也可以使用 rdoc-cli 命令，跟 rdoc 命令是一样的
## 增加 用 rdoc-cli 命令，目的是解决 Mac 系统自带的 Ruby 命令 rdoc 冲突
```

3. 运行网站

初始化工程，其实就是 `rdoc` 工具的文档，里面 Markdown 都是写好的，直接运行下面命令，可看效果

```shell
$ cd my-project  # 进入初始化的工程目录
$ npm install    # 安装依赖，这里依赖了 rdoc 版本，避免 rdoc 升级带来的问题。
$ npm start      # 启动服务

## Compiled successfully!
##
## You can now view rdoc in the browser.
##
##   Local:            http://localhost:5858/
##   On Your Network:  http://192.168.188.109:5858/
## Note that the development build is not optimized.
## To create a production build, use npm run build.
```

会自动打开网站，同时命令行会提示你，打开的网址，这样你就可以开始写 Markdown 了，并且可以实时预览你的网站。
