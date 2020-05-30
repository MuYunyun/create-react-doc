<!--
title: 发布网站 
sort: 5
-->

文档网站搞好之后，可以发布到 Github 中，可以部署到自己的服务器上面，Github 仓库提供一个 `gh-pages` 分支，用于静态资源托管，意味着你将静态页面生成`push` 到这个分支直接可以预览。下面简单的介绍发布到 GitHub 中预览的步骤。


## 生成静态资源

添加配置一条 `npm scripts`，通过命令运行生成静态资源

```diff
{
  "name": "doc-example",
  "description": "Describe doc-example here",
  "scripts": {
+    "build": "rdoc -d home,introduce,faq,example,about,github --build"
    "start": "rdoc -d home,introduce,faq,example,about,github --clean"
  },
  "dependencies": {
    "rdoc": "1.2.x"
  },
  "license": "MIT"
}
```

运行命令生成静态资源，默认静态资源生成到，当前工程根目录下的 `.rdoc-dist` 目录

⚠️  `.rdoc-dist` 目录为默认生成静态资源目录，建立文档目录的时候需要注意

```shell
$ npm run build
```

## 部署网站

添加配置一条 `npm scripts`, 通过命令部署到对应的 `Github` 仓库中。

```diff
{
  "name": "doc-example",
  "description": "Describe doc-example here",
  "scripts": {
+    "deploy": "rdoc --publish <your repo url>",
    "build": "rdoc -d home,introduce,faq,example,about,github --build"
    "start": "rdoc -d home,introduce,faq,example,about,github --clean"
  },
  "dependencies": {
    "rdoc": "1.2.x"
  },
  "license": "MIT"
}
```

同时可以指定分支，默认推送到 `gh-pages`分支，配置实例如下：

```shell
$ rdoc --publish https://github.com/react-doc/react-doc.github.io.git --branch master
```

如果全局安装了 `rdoc` 工具，直接可以将上面命令放到命令行运行，记得在项目的根目录下运行哦。
