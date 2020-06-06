<p align="center">
  <a href="https://react-doc.github.io">
    <img width="150" src="theme/default/rdoc.logo.svg?sanitize=true">
  </a>
</p>

create-react-doc
---

Fast static site generator for React. You only just write **Markdown**.

* Files is just blog.

## Start

**create-react-doc** is very easy to use, you only install it as a package so that you can create your own website or blog. Let's start!

### Install

Install `create-react-doc` to global system，make sure `Node >= 8` in your computer.

```bash
npm install create-react-doc -g
```

1. init project.

```bash
create-react-doc init my-project
```

2. run.

```bash
cd my-project && npm install
npm start
```

3. build static html resource.

```bash
npm run build
```

4. config deploy url in `package.json`.

```js
{
  "scripts": {
    "deploy": "create-react-doc --publish <your repo url>"
    ...
  },
  ...
}
```

5. deploy your own website.

```bash
npm run deploy
```

### Help

```shell
Usage: create-react-doc [options]

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

### License

The MIT License (MIT)

### Used Case

* [blog](https://github.com/MuYunyun/blog)