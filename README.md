<p align="center">
  <a href="https://react-doc.github.io">
    <img width="150" src="theme/default/rdoc.logo.svg?sanitize=true">
  </a>
</p>

create-react-doc
---

[![Join the chat at https://gitter.im/j-rdoc/Lobby](https://badges.gitter.im/j-rdoc/Lobby.svg)](https://gitter.im/j-rdoc/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![](https://img.shields.io/github/issues/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/issues) [![](https://img.shields.io/github/forks/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/network) [![](https://img.shields.io/github/stars/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/releases) [![jaywcjlove/sb](https://jaywcjlove.github.io/sb/lang/english.svg)](README.md)

基于 React 的快速静态网站生成器，你只需要写 Markdown 文档即可。

<div align="center">
  <img src="./rdoc.png">
</div>

## 开始

**create-react-doc** 使用非常简单，只需将其它作为模块安装并运行即可创建您的网站。

让我们开始吧！

### 安装

安装 `create-react-doc` 到你系统的全局，您需要在本地开发计算机上使用 `Node >= 8`。


```bash
npm install create-react-doc -g

# /usr/local/bin/create-react-doc -> /usr/local/lib/node_modules/create-react-doc/.bin/create-react-doc.js
# /usr/local/bin/create-react-doc-cli -> /usr/local/lib/node_modules/create-react-doc/.bin/create-react-doc.js
```

增加了 `create-react-doc-cli` 命令来解决 Mac 集成 `create-react-doc` 命令冲突。

1. 初始化项目

```bash
create-react-doc init my-project  # Init project
# 或者
create-react-doc-cli init my-project
```

2. 运行网站

```bash
cd my-project && npm install # 进入目录安装依赖
npm start # 启动服务。
```

3. 编译输出静态HTML资源。

```bash
npm run build
```

4. 在 `package.json` 中配置部署 `URL`。

```js
{
  "scripts": {
    "deploy": "rdoc --publish <your repo url>"
    ...
  },
  ...
}
```

5. 部署到 Github `gh-pages` 分支。

```bash
npm run deploy
```

### 命令帮助

```shell
Usage: create-react-doc [options]

Fast static site generator for React.

Options:

  -i, init [path]        创建一个空的网站或重新初始化一个现有网站。
  -d, --doc <path>       生成指定其他文档。
  -o, --output <path>    将编译的文件写入磁盘目录。（默认：.rdoc-dist）
  -p, --port [number]    端口。(默认: 5858)
  --host [host]          主机. (默认: 0.0.0.0)
  -b, --branch <branch>  <分支>您要推送的分支的名称。（默认：gh-pages）
  --publish [url]        将生成的代码，push到指定仓库，已经分支。
  --build                创建编译的生产版本。
  --clean                删除.cache文件夹。
  -h, --help             输出使用帮助文档。

Examples:

  $ create-react-doc init
  $ create-react-doc init doc-example
  $ create-react-doc -d doc/mm
  $ create-react-doc -d tutorial,doc
  $ create-react-doc -d tutorial,doc --clean --build
  $ create-react-doc -p 2323  -d doc --clean
  $ create-react-doc --host 0.0.0.0 -d doc --clean
  $ create-react-doc --publish https://<your-git-repo>.git --branch master
```

### 开发

获取代码，进入目录，运行自动重载构建，：

```shell
$ git clone https://github.com/MuYunyun/create-react-doc
$ cd create-react-doc     # 进入目录
$ npm install             # or yarn install
```

要开发，请运行自重载构建：

```bash
# 运行应用程序
# 每次代码更改时，自动重新启动应用程序。
# 在开发过程中很有用。
$ npm run start
```

打开浏览器并访问 http://localhost:5858

### Folders

```bash
.
├── README.md
├── .create-react-doc-dist
├── package.json
├── src
│   ├── build.js
│   ├── commands
│   ├── conf
│   ├── publish.js
│   ├── server.js
│   ├── utils
│   └── web
├── templates
│   └── default # 记录静态文件。
└── theme
    └── default
```

### License

The MIT License (MIT)
