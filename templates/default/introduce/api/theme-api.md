<!--
title: 主题定制API
sort: 3
-->

## 全局变量

全局变量 `__project_root__` 通常用于模板中懒加载 `markdown` 文件，例如：

> 生成的缓存序列化文件，将被存放到当前目录下的 `.cache/md` 目录中。

```js
// 加载高亮库
import hljs from 'highlight.js';

// filename 处理很重要
// Markdown文件被处理成 `doc___fed___react___component-and-props.md` 这样,
// 路径以下划线间隔避免重复，所以 要获取路径得 通过 props.page.routeData 中获取 relative 路径来处理
const filename = '';
// 加载 Markdown 文件，
import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
  this.setState({
    markdown: data,
  }, () => {
    // 找到当前组件根节点，循环code, 
    // 对code里面的代码进行高亮
    let code = ReactDOM.findDOMNode(this);
    code = code.getElementsByTagName('code');
    for (let i = 0; i < code.length; i += 1) {
      if (code[i].parentNode && code[i].parentNode.tagName === 'PRE') {
        hljs.highlightBlock(code[i]);
      }
    }
  });
});
```

## Markdown 文件索引

那你需要建立一个 `替身` 文件 `rdoc.tree.data.json`，引用替身文件，就可以获取到目录索引内容，这个在编译的时候会自动返回文件索引的 `json`。

> ⚠️ 替身文件名字，必须取名 `rdoc.tree.data.json`。   
> ⚠️ 这个文件是必须建立，引用，这样可以渲染菜单。  
> ⚠️ rdoc v1.3.0 以后版本不需要，如果你有同名文件会被替换成，Markdown 文件索引。  
> ⚠️ Markdown 文件索引，会在入口函数传入。

```js
import menuSource from './rdoc.tree.data.json';
```

## 模板入口

```js
import BaseLayout from './layout/BasicLayout';
import Loading from './component/Loading';

export default function (Lazyload, props) {
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
      item.component = Lazyload({
        component: () => import('./routes/Pages'),
        LoadingComponent: Loading,
      });
      return item;
    });
  }
  return <BaseLayout {...props} />;
}
```

## 两个入口参数

`props` 提供路由索引，和 Markdown 文件索引信息。`Lazyload` 为懒加载方法。

### Lazyload

文档工具包 [react-dynamic-loadable](https://github.com/jaywcjlove/react-dynamic-loadable) 提供的，懒加载方法，下面方法为路由添加 `component` 并传入相应参数。

```js
props.routeData.map((item) => {
  item.component = Lazyload({
    component: () => import('./routes/Pages'),
    LoadingComponent: Loading,
  });
  return item;
});
```

### props

```js
{
  history: {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …},
  location: {pathname: "/introduce/api/theme-api", search: "", hash: "", state: undefined},
  match: {path: "/", url: "/", params: {…}, isExact: false},
  menuSource: [{…}, {…}, {…}, {…}, {…}],
  routeData: [{…}, {…}, {…}, {…}, {…}],
  staticContext: undefined
}
```

#### props.menuSource

> path 你 Markdown 的全路径  
> name 文件夹或者文件的名称  
> type 当前节点是一个文件夹还是一个文件`file|directory`  
> extension 类型为`file`的后缀  

> **根据文件索引出来的参数**  
> 
> relative 相对于你指定的路径  
> routePath 路由路径  
> isEmpty  
> size 文件大小  
> mdconf 是你在 Markdown中定义的参数  

> **Markdown手动配置的参数**  
> 
> sort 排序  
> title 标题  
> visible 是否隐藏菜单  

```json
[
  {
    "path": "/Users/mac/doc-example/index",
    "name": "index",
    "children": [
      {
        "path": "/Users/mac/doc-example/index/README.md",
        "name": "README.md",
        "relative": "/index/README.md",
        "mdconf": {
          "title": "首页",
          "layout": "IndexLayout",
          "visible": "true",
          "logo": "/introduce/assets/react-logo.svg"
        },
        "isEmpty": false,
        "size": 1821,
        "extension": ".md",
        "type": "file",
        "title": "首页",
        "sort": 0,
        "routePath": "/index/README",
        "article": "index"
      }
    ],
    "size": 1821,
    "type": "directory",
    "mdconf": {
      "title": "首页",
      "layout": "IndexLayout",
      "visible": "true",
      "logo": "/introduce/assets/react-logo.svg"
    },
    "props": {
      "path": "/Users/mac/doc-example/index/README.md",
      "name": "README.md",
      "relative": "/index/README.md",
      "isEmpty": false,
      "size": 1821,
      "extension": ".md",
      "type": "file"
    },
    "sort": 0,
    "routePath": "/index",
    "article": "index"
  }
]
```

#### props.routeData

> props 文档配置及其信息  
> path 路由信息，配合 `React Router` 使用  
> relative 路径，从项目的，根目录开始，主要用于读取 Markdown 组合 Markdown 的文件名字  

```json
[
  {
    "path": "/introduce/api",
    "mdconf": {
      "title": "API",
      "sort": "3"
    },
    "props": {
      "path": "/Users/mac/doc-example/introduce/api/README.md",
      "name": "README.md",
      "relative": "/introduce/api/README.md",
      "isEmpty": true,
      "size": 27,
      "extension": ".md",
      "type": "file"
    },
    "article": "introduce",
    "title": ""
  },{
    "path": "/index",
    "mdconf": {
      "title": "首页",
      "layout": "IndexLayout",
      "visible": "true",
      "logo": "/introduce/assets/react-logo.svg"
    },
    "props": {
      "path": "/Users/mac/doc-example/index/README.md",
      "name": "README.md",
      "relative": "/index/README.md",
      "isEmpty": false,
      "size": 1821,
      "extension": ".md",
      "type": "file"
    },
    "article": "index",
    "title": ""
  },
]
```

## BaseLayout

这个是定于的主框架模板，俗称通用布局，主要用于定制头部右边，不常变换的内容，你可以定义多个 `Layout`, 例如你定义 `Markdown` 参数，根据参数加载不用样式的通用布局。


## 默认依赖包

工具基础的前端包工具，制作主题需要安装依赖包，提供一个实例 [rdoc-theme-load-react](https://github.com/react-doc/rdoc-theme-load-react)。

```bash
{
  "classnames": "2.2.5",
  "highlight.js": "9.12.0",
  "prop-types": "15.6.0",
  "react": "16.2.0",
  "react-dom": "16.2.0",
  "react-markdown": "3.1.3",
  "react-router-dom": "4.2.2",
}
```
