<!--
title: 网站设置 
sort: 9
-->

通过一些配置定义网站一些内容如：标题、favicon、logo等。

## 网站标题

通过定义首页，在首页添加配置，配置 `title: 网站标题` 即可配置网站标题。

```markdown
<!--
title: 首页 
layout: IndexLayout
-->

下面是首页内容
```

## favicon

默认显示 rdoc 的图标，自定义 favicon 需要自己生成一个图标命名为 `favicon.ico` 放在项目的根目录，与 `package.json` 同级目录。

也可以在 `package.json` 中添加配置，如下：

```js
{
  "rdoc": {
    "favicon":"favicon.ico",
  },
  ...
}
```

⚠️ 注意事项：这里只支持自定义 `.ico` 格式的图片logo，不接受其它格式。

## logo

默认显示 rdoc 工具的 `logo`, 需要自定，有两种方法：

> 1. 放入 Markdown 文档工程的根目录，命名`logo.svg` 即可。  
> 2. 在 `package.json` 中定义配置。  

```js
{
  "rdoc": {
    "logo":"rdoc.logo.svg",
  },
  ...
}
```

⚠️ 注意事项：这里只支持自定义 `.svg` 格式的图片logo，不接受其它格式。
