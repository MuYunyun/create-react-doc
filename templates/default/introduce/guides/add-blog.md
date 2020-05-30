<!--
title: 添加博客 
sort: 3
-->

首先运行命令指定一个目录，将项目跑起来。假设，你在 `package.json` 中配置的命令如下：

```js
{
  "scripts": {
    "start": "rdoc -d doc"
  },
  ...
}

```

上面配置了 `doc` 为文档目录，里面存放 `Markdown` 文档，通过下面命令将网站跑起来:

```shell
$ npm run start
```

如果你全局 安装 `rdoc` , 可以直接运行下面命令

```shell
$ rdoc -d doc # 不建议这么干，因为 rdoc 工具在更新，尽量放到package.json中，避免遗忘依赖的 rdoc 版本
```

上面命令指向了一个目录，只需在这个目录里面添加 `Markdown` 文件即可，注意 `README.md` 是一个特殊名字，默认为首页，在 `git` 仓库中，被命名为 `README.md` 的文本文件，是会被 `git` 仓库识别为说明文档，我们在这边把它定义为首页，可以在 `git` 仓库中直接预览。

```shell
## 新建一个博客文章
$ touch doc/README.md
```

在 `Markdown` 文件的顶部添加配置，配置熟悉方式是一段 `HTML` 注释，这样就可以在 `git` 仓库中不显示注释，同时又可以当做网站页面的配置。

```markdown
<!--
title: 博客文章标题
-->

这里是博客的详细内容
....
```
