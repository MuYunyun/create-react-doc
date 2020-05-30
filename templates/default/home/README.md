<!--
title: Create React Doc
layout: IndexLayout
visible: true
-->

<style>
body, html { background: #fff; }
.markdown{ padding: 0 20px; }
.jumbotron {
  position: absolute;
  background-color: #383838;
  top: 56px;
  left: 0;
  right: 0;
  padding-top: 80px;
  min-height: 380px;
  color: #c1c1c1;
}
.jumbotron-block { min-height: 400px; }
.jumbotron-warpper {
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
}
.jumbotron-title {
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 20px;
}
.jumbotron-des {
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 300;
  margin-bottom: 30px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
.jumbotron .jumbotron-btn {
  display: inline-block;
  color: #333;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  background-color: #fff;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.jumbotron-btn:hover {
  background-color: #bbb;
  color: #333;
}
.jumbotron-btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
}
</style>
<div class="jumbotron">
  <div class="jumbotron-warpper">
    <div class="jumbotron-title">Create React Doc </div>
    <div class="jumbotron-des">Create React Doc 是一个文档生成工具，用于生成文档网站或简单的博客网站。<br/>简单到你只需写 Markdown 文件就可以帮助你生成网站。<br/>同时可以方便的集成到你的项目工程中。</div>
    <a class="jumbotron-btn" href="#/introduce/init-project">快速开始</a>
  </div>
</div>
<div class="jumbotron-block"> </div>

在开始之前，推荐先学习 Markdown 语法，并正确安装和配置了 [Node.js](https://nodejs.org) v8.0 或以上。

主要用于快速生成文档工具或简单的网站，只需要写Markdown文件既可。

```bash
npm install create-react-doc -g   # 安装工具
# /usr/local/bin/create-react-doc -> /usr/local/lib/node_modules/create-react-doc/.bin/create-react-doc.js
# /usr/local/bin/create-react-doc-cli -> /usr/local/lib/node_modules/create-react-doc/.bin/create-react-doc.js

create-react-doc init my-project  # 初始化项目
# 也可以使用 create-react-doc-cli 命令，跟 create-react-doc 命令是一样的
# 增加 用 create-react-doc-cli 命令，目的是解决 Mac 系统自带的 Ruby 命令 create-react-doc 冲突

cd my-project && npm start # 进入工程，启动服务
```

### Command

```shell
Usage: create-react-doc [options]

Fast static site generator for React.

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  -d, --doc <path>       Other documents generated.
  -o, --output <path>    Writes the compiled file to the disk directory. (default: .rdoc-dist)
  -p, --port [number]    The port. (default: 5858)
  --host [host]          The host. (default: 0.0.0.0)
  -b, --branch <branch>  Name of the branch you are pushing to. (default: gh-pages)
  --publish [url]        Other documents generated.
  --build                Creating an optimized production build.
  --clean                Delete the .cache folder.
  -h, --help             output usage information

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
