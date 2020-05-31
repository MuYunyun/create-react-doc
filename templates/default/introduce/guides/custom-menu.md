<!--
title: 自定义菜单
sort: 4
-->

## 主菜单定制

主菜单的定制，是通过 `建立` 目录来定制的，默认菜单名字是根据目录文件夹名字来显示，下面实例定义了主菜单有三个菜单，顺序分别为 `tutorial`、`doc`、`component`

```shell
$ rdoc -d tutorial,doc
```

可以自定义菜单名字，通过在文件夹的跟目录建立 `README.md` 添加配置来设置菜单的名字。

```markdown
<!--
title: Layout 布局组件
-->
```

⚠️ 通过配置菜单对应根目录下的 `README.md` 来改变 `菜单顺序` 和 `是否显示`，[配置参考](#/introduce/api/markdown-config)。

> sort 菜单顺序
> visible 菜单是否显示 `true` 不显示

## Github跳转

新建一个目录 `github`，命令配置 `rdoc -d tutorial,doc,github` 将在主菜单上显示，在 `github` 目录下新建 `README.md` 文件，添加 Markdown 配置如下：

> ⚠️ 注意: github 配置项，会增加 `github` 图标
> 如果不想显示`图标`，就将 `github` 指定 `url` 配置。

```markdown
<!--
title: GitHub
github:
sort: 4
-->
```

## 子菜单定制

在某个菜单下面定制二级菜单，默认情况，只需要在该目录创建多个 `.md` 文件，如下目录结构，有四个子菜单`api`、`getting-started`、`guides`、`precautions`。

> ⚠️ 注意: 文件夹不能跟文件重名

```shell
└── introduce
    ├── README.md
    ├── api
    │   ├── README.md
    │   └── menu-config.md
    ├── getting-started
    │   ├── README.md
    │   └── site-preparation.md
    ├── guides
    │   ├── README.md
    │   └── menu-sort.md
    └── precautions.md
```

## 子菜单菜层级

以相同的方式在该目录下面创建目录，并且创建 `.md` 文件，再添加相应的配置即可，如下目录结构，二级菜单将有三层。

```shell
└── introduce
    ├── README.md
    ├── api
    │   ├── README.md
    │   ├── getting-started
    │   │   ├── README.md
    │   │   └── site-preparation.md
    │   └── menu-config.md
    └── precautions.md
```

## 菜单分类

子菜单分类是根据目录结构来分类的，假设你新建如下目录结构，配置的命令指向目录 `introduce`，那么你根目录下面的 `README.md` 里面可以配置一级导航的信息内容，二级目录文件夹分别为导航菜单的分类名称。

在 `introduce` 目录下面的，每个目录下，面再新建 `README.md` 来配置分类的各种信息，如此循环下去，可以新建一个树形菜单。

```shell
└── introduce
    ├── README.md
    ├── api
    │   ├── README.md
    │   └── menu-config.md
    ├── getting-started
    │   ├── README.md
    │   └── site-preparation.md
    ├── guides
    │   ├── README.md
    │   └── menu-sort.md
    └── precautions.md
```
