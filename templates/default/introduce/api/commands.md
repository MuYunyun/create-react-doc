<!--
title: 命令说明
sort: 1
-->

提供了一个 `create-react-doc-cli` 命令，跟 `create-react-doc` 命令是一样的，目的是解决 `Mac` 系统自带的 `Ruby` 命令 `create-react-doc` 冲突。

## 命令帮助

```shell
Usage: create-react-doc [options]

Fast static site generator for React.

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  -d, --doc <path>       Other documents generated.
  -o, --output <path>    Writes the compiled file to the disk directory. (default: .crd-dist)
  -p, --port [number]    The port. (default: 5858)
  -h, --host [host]      The host. (default: 0.0.0.0)
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
  $ create-react-doc -h 0.0.0.0 -d doc --clean
  $ create-react-doc --publish https://<your-git-repo>.git --branch master
```


## 命令配置实例

通常情况下，将上面命令配置到 `package.json` 中

```json
{
  "name": "doc-example",
  "version": "1.0.0",
  "scripts": {
    "start": "rdoc -d home,introduce,faq,doc --clean"
  },
  "license": "MIT"
}
```

也可以全局安装，直接运行全局命令，这样的话，每次只能编译一个网站。

```shell
$ rdoc -d doc/mm
$ rdoc -d tutorial,doc
$ rdoc -p 2323  -d doc --clean
$ rdoc -h 0.0.0.0 -d doc --clean
```


