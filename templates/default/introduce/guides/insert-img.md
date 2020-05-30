<!--
title: 插入图片
sort: 8
-->

Markdown 文档内可以插入图片资源。

## 通过 Markdown 语法插入图片

Markdown 语法插入图片，将无法控制图片尺寸大小。

![react-logo](https://avatars1.githubusercontent.com/u/1680273?s=460&v=4)

```markdown
![react-logo](https://avatars1.githubusercontent.com/u/1680273?s=460&v=4)
```

## HTML插入图片

通过HTML来引入图片显示，可以通过设置样式控制图片的尺寸大小

<img src="https://avatars1.githubusercontent.com/u/1680273?s=360&v=4"/>
<img width="60" height="60" src="./assets/react-logo.svg"/>

```html
<img src="https://avatars1.githubusercontent.com/u/1680273?s=460&v=4"/>
<img width="60" height="60" src="./assets/react-logo.svg"/>
```

## 图片路径

这里图片路径有点特殊，所以在此做详细说明，假设，你的下目录如下：

```shell
├── doc
│   ├── README.md
│   └── react
│       └── README.md
├── introduce
│   ├── api
│   │   └── menu-config.md
│   ├── assets
│   │   ├── react-logo.svg
│   │   └── webpack-logo.svg
│   └── precautions.md
├── package.json
└── src
    └── component
```

配置运行命令如下：

```shell
$ rdoc -d doc,introduce --clean
```

现在你的目录 `introduce/assets` 下面有两个图片 `react-logo.svg`、`webpack-logo.svg`，你需要在 `doc/react/README.md` Markdown 文件中 访问这两张图片，此时你的访问路径应该是，相对于 `introduce` 目录下找到图片，图片引用如下：

```markdown
![react-logo](./assets/react-logo.svg)
```

因为你上面命令配置了三个根目录文件夹，`introduce`文件夹是其中之一，所以路径不包含根目录。

现在假设，你在 `introduce` 当前目录的 `introduce/api/menu-config.md` Markdown 文件中访问 `introduce/assets` 文件夹下面的 `webpack-logo.svg` 图片，这个时候，两个资源都在同一个根目录下，图片引用如下，跟上面一样的路径：

```markdown
![react-logo](./assets/react-logo.svg)
```

这个时候你也可以相对于 `menu-config.md` Markdown 文件，路径如下：

```markdown
![react-logo](../assets/react-logo.svg)
```
