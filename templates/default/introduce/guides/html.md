<!--
title: HTML代码运行
sort: 6
-->

在 `Markdown` 文档中支持 `HTML` 代码运行，请谨慎使用，如果你对前端代码有所了解，这一功能，将对你的文档生有很大的想象，比如添加网站统计功能，自定义一个页面等等。

## HTML & CSS

下面是 `HTML` 代码实例运行效果

<style>
.back {
  background-color: #00C343;
  color: #fff;
  padding: 20px;
}
</style>
<div class="back" style="width:200px;">这里是Markdown内部HTML代码运行实例</div>

可将下面代码复制到 Markdown 中运行查看效果：

```html
<style>
.back {
  background-color: #e2e2e2;
  padding: 20px;
}
</style>
<div class="back" style="width:200px;">这里是Markdown内部HTML代码运行实例</div>
```

## JavaScript

> ⚠️ 目前 `Markdown` 中不支持 `JS` 代码运行。  

<div class="back2" style="width:200px;margin-top:20px;">这里是Markdown<span id="test"></span>内部 JS 代码运行实例</div>
<style>
.back2 {
  background-color: #b9b9b9;
  color: #fff;
  padding: 20px;
}
</style>

<script type="text/javascript">
alert('sd')
console.log('==>',document.getElementById('test'))
window.onload = function(){
  document.getElementById('test').innerHTML = "sdfsdf";
}
</script>


## HTML Demo 预览

需要在代码块前后加上一段 `<!--DemoStart--> ` 和 `<!--End-->` 注释即可，代码如下：

```
<!--DemoStart--> 
\```html
<div style="color:red;">
  Test Preview HTML Example.
</div>
<script>
console.log('test')
</script>
\```
<!--End-->
```

下面是效果

<!--DemoStart--> 
```html
<div style="color:red;">
  Test Preview HTML Example.
</div>
<script>
console.log('test')
</script>
```
<!--End-->

目前只预览 `HTML`, 下面为 `LESS` 展示

<!--DemoStart--> 
```less
.wapper {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}

.wapperContent {
  padding: 15px 0 0 0;
  max-width: 1200px;
  margin: 0px auto 0;
}
```
<!--End-->
