<!--
title: 网站准备 
sort: 3
-->

准备一个目录 `mkdir doc-example`, 在目录中创建一些文件，为你的网站规划一些目录结构。如果你不是初始化一个工程，那你在创建一个文档网站前，需要做一些准备工作，规划你的网站目录，比如 `顶部一级导航`。

## 生成配置文件

生成 `package.json` 文件

```shell
$ npm init -y
```

## 建立目录

建立几个目录，用于存放 `Markdown` 文件，后面配置指定这些目录，这些目录帮助你生成 `顶部一级导航`。

> 1. 一级导航目录下，建立目录，内容将展示在该栏目下面，会产生右边菜单栏。  
> 2. 每个目录下面建立 `README.md` 文件，视为一级导航需要展示的内容。  
> 3. 默认每个目录都需要建立一个 `README.md`。

根据上面规则，我创建了如下目录结构：

**目录结构**

```
├── about
│   └── README.md
├── home
│   └── README.md
├── introduce
│   ├── README.md
│   ├── api
│   │   ├── README.md
│   │   ├── commands.md
│   │   ├── markdown-config.md
│   │   └── theme-api.md
│   ├── getting-started
│   │   ├── README.md
│   │   ├── install.md
│   │   ├── site-creation.md
│   │   └── site-preparation.md
│   └── guides
│       ├── README.md
│       ├── add-blog.md
│       ├── add-index.md
│       ├── custom-menu.md
│       ├── html.md
│       ├── insert-img.md
│       └── menu-sort.md
└── package.json
```
