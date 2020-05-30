<!--
title: Markdown 配置
sort: 2
-->

通过一些配置，配置菜单顺序、页面重定向、页面标题等功能。

1. 开始一段注释，来设置文档信息。
2. 文件与文件夹不能重名。

## 配置

配置以 [YAML 1.2](http://www.yaml.org/) 格式来定义，放到一段注释内。

```markdown
<!--
放置YAML配置信息 
-->
```

> **`title<String>`** 设置了即为文档标题，默认以文档名称命名，如：`Layout.md` 文档标题为 `Layout`。  
> **`redirect<String>`** 重定向到其它 `Markdown` 文件路由，Markdown文件必须不能为空。  
> **`sort<Number>`** 菜单顺序，排序顶部菜单，左边二级菜单顺序。  
> **`visible<Boolean>`** 为 `true` 仅在菜单上不显示，路由任然可以访问。  
> **`layout<String>`** 默认模板指定 `IndexLayout`，将加载首页模板，并认定为首页。  
> **`github<String>`** 指定一个URL，点击菜单跳转到对应的地址。  

## 实例

下面是一个 Markdown 文档的配置，需要将配置写入 Markdown 文件中的顶部，并且以中文冒号间隔。

```markdown
<!--
title: Layout 布局组件
redirect: layout
-->
```
