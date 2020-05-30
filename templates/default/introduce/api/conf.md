<!--
title: 配置文件
sort: 4
-->

配置文件可以添加设置网站内容和主题等

## 配置文件添加

配置可以通过 `package.json` 文件以 JSON 的形式添加，也可以通过，在根目录下添加 `.rdocrc.json` 文件，将配置内容存入该文件中。

## 配置说明

在 `package.json` 中添加配置

```diff
{
  "name": "doc",
  "version": "1.0.0",
  "scripts": {
    "deploy": "rdoc --publish <your repo url>",
    "build": "rdoc -d home,introduce --clean --build",
    "start": "rdoc -d home,introduce --clean"
  },
+  "rdoc": {
+    "theme": "rdoc-theme-load-react",
+    "favicon": "./assets/favicon.ico",
+    "logo": "./assets/rdoc.logo.svg",
+    "footer": "前端<b>开</b>发"
+    "react_modules": {
+      "Hotkeys": "react-hot-keys"
+    }
+  },
  "dependencies": {
    "rdoc": "1.4.x",
+    "rdoc-theme-load-react": "^1.1.0",
+    "react-hot-keys": "^1.1.0"
  }
}
```

在 `.rdocrc.json` 中添加配置。

```json
{
  "title": "Rdoc title",
  "theme": "rdoc-theme-load-react",
  "favicon": "./assets/favicon.ico",
  "logo": "./assets/rdoc.logo.svg",
  "react_modules": {
    "Hotkeys": "react-hot-keys"
  }
}
```

⚠️注意：  
1. 优先读取 `.rdocrc.json` 配置。  
2. 两种配置只有一种起作用。  

### title

设置默认网页标题内容。

```html
<title>Rdoc title</title>
```

### favicon

默认显示 `rdoc` 的图标，自定义 `favicon` 需要自己生成一个图标命名为 `favicon.ico` 放在项目的根目录自动识别。添加配置，可以指定不同文件名和路径下的 `ico` 文件。

### logo

默认显示 `rdoc` 的图标，自定义 `logo` 需要自己生成一个图标命名为 `logo.svg` 放在项目的根目录自动识别。添加配置，可以指定不同文件名和路径下的 `svg` 文件。

### theme

默认使用 `rdoc` 的默认主题，你可以通过这个配置指定一个主题，同时你可以自定义自己的主题，这里有个实例 [rdoc-theme-load-react](https://github.com/react-doc/rdoc-theme-load-react)，可以参照这个实例进行更改。

> ⚠️注意事项：主题必须以 rdoc-theme- 开头，否则会报错。

### react_modules

这个参数是一个特定参数，需求是在制作主题的时候，你的主题需要预览 React 实例，实例还需要加载一些未知的第三方 React 组件，这个时候你需要在你的 Markdown 项目中安装你需要的 React 组件，在配置中指定你的组件，在预览实例中你就可以引用该组件了。

> ⚠️注意：还在研究实现方式。

### footer

更改文档网站页脚
