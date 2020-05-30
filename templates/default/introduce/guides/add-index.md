<!--
title: 添加首页 
sort: 4
-->


在指定的目录，根目录下的 `README.md` 文件中，参数 `layout` 默认模板指定 `IndexLayout`，将加载首页模板，并认定为首页。通过指定 `visible` 参数表示不在导航菜单中显示。

```markdown
<!--
title: 首页 
layout: IndexLayout
-->

下面是首页内容
```

添加 `title` 设置将全局标题都会带上。


## 无限可能的想象

首页对应的 `README.md` 中写 HTML、CSS 可以搞出不一样的首页哦，本文档网站首页就是这么玩儿的，在里面放置了如下代码：


```html
<style>
body, html { background: #fff; }
.markdown{
  padding: 0 30px;
}
.jumbotron {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #383838;
  padding-top: 100px;
  min-height: 300px;
  color: #c1c1c1;
}
.jumbotron-block {
  min-height: 330px;
}
.jumbotron-warpper {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.jumbotron-title {
  font-size: 30px;
  font-weight: bold;
}
</style>
<div class="jumbotron">
  <div class="jumbotron-warpper">
    <div class="jumbotron-title">RDoc </div>
    <div class="jumbotron-des">RDoc 是一个文档生成工具，用于生成文档网站或简单的博客网站，简单到你只需写 Markdown 文件就可以帮助你生成网站。同时可以方便的集成到你的项目工程中。
    </div>
  </div>
</div>
<div class="jumbotron-block"> </div>
```
