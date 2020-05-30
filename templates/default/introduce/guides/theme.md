<!--
title: 主题定制
sort: 10
-->

通过自定义主题来定义网站前端内容。下面定义主题的步骤：

## 创建主题

```bash
mkdir create-react-doc-theme-load-react # 创建主题目录
npm init -y # 生成配置文件 package.json
```

⚠️ 注意事项：主题必须以 `create-react-doc-theme-` 开头，否则会报错。

生成 `package.json` 内容：

```json
{
  "name": "create-react-doc-theme-load-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

## 添加主题文件

```bash
├── README.md  # 说明文档
├── lib        # 主题文件编译后的文件
├── package.json
└── src        # 没有编译的js文件
```

可以将默认主题拷贝到 `src` 目录中，基于[默认主题](https://github.com/jaywcjlove/rdoc/tree/master/theme/default)来改一个新的主题。

## 添加编译命令

主题文件建立好之后，通过 `babel` 来编译你的主题，将编译后的文件存储到 `lib` 目录中，添加编译命令，通过 `npm run build` 去编译你的代码。

安装依赖

```shell
npm install --save-dev babel-cli babel-core babel-eslint babel-plugin-syntax-dynamic-import babel-plugin-transform-async-to-generator babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread babel-plugin-transform-runtime babel-preset-env babel-preset-react
```


```diff
{
  "name": "create-react-doc-theme-load-react",
  "version": "1.0.0",
  "description": "",
+  "main": "lib/index.js",
-  "main": "index.js",
  "scripts": {
+    "build": "BABEL_ENV=production babel --ignore=src/**/__test__ --plugins transform-runtime src --out-dir lib --copy-files ",
-    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
+  "devDependencies": {
+    "babel-cli": "^6.26.0",
+    "babel-core": "^6.26.3",
+    "babel-eslint": "^8.2.3",
+    "babel-plugin-syntax-dynamic-import": "^6.18.0",
+    "babel-plugin-transform-async-to-generator": "^6.24.1",
+    "babel-plugin-transform-class-properties": "^6.24.1",
+    "babel-plugin-transform-object-rest-spread": "^6.26.0",
+    "babel-plugin-transform-runtime": "^6.23.0",
+    "babel-preset-env": "^1.6.1"
+  },
  "license": "MIT"
}
```

添加babel配置文件 `.babelrc`。

```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "transform-object-rest-spread",
    "syntax-dynamic-import",
    "transform-async-to-generator",
    "transform-class-properties",
    "transform-runtime"
  ]
}
```

通过运行命令编译主题

```bash
npm run build
```

## 添加实时编译命令

添加监听模式下开发你的主题，你不能写一句代码，运行一下 `npm run start` 去编译你的代码，要实时编译你的代码，所以你要添加一个实时编译参数。

```diff
{
  "name": "create-react-doc-theme-load-react",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "BABEL_ENV=production babel --ignore=src/**/__test__ --plugins transform-runtime src --out-dir lib --copy-files ",
+    "dev": "BABEL_ENV=production babel -w --ignore=src/**/__test__ --plugins transform-runtime src --out-dir lib --copy-files ",
+    "start": "npm run dev"
  },
  "keywords": [],
  "author": "",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1"
  },
  "license": "MIT"
}
```

通过运行命令，实时编译主题

```bash
npm run start
```

## 添加代码检测

安装代码检测依赖工具

```bash
npm install --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-watch
```

添加对应的代码检测命令

```diff
{
  "name": "create-react-doc-theme-load-react",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "BABEL_ENV=production babel --ignore=src/**/__test__ --plugins transform-runtime src --out-dir lib --copy-files ",
    "dev": "BABEL_ENV=production babel -w --ignore=src/**/__test__ --plugins transform-runtime src --out-dir lib --copy-files ",
-    "start": "npm run dev"
+    "start": "npm run dev & npm run lint:watch",
+    "lint": "NODE_ENV=production eslint src",
+    "lint:watch": "esw -w src",
+    "test": "npm run lint"
  },
  "keywords": [],
  "author": "",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
+    "eslint": "^4.19.1",
+    "eslint-config-airbnb": "^16.1.0",
+    "eslint-plugin-import": "^2.11.0",
+    "eslint-plugin-jsx-a11y": "^6.0.3",
+    "eslint-plugin-react": "^7.7.0",
+    "eslint-watch": "^3.1.4"
  },
  "license": "MIT"
}
```

添加代码检查 ESLint 的配置文件 `.babelrc`。

```json
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
    "jasmine": true
  },
  "plugins": [
    "react",
    "import"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "linebreak-style": 0,
    "func-names": 0,
    "sort-imports": 0,
    "arrow-body-style": 0,
    "prefer-destructuring": 0,
    "max-len": 0,
    "consistent-return": 0,
    "comma-dangle": [ "error", "always-multiline" ],
    "function-paren-newline": 0,
    "class-methods-use-this": 0,
    "react/sort-comp": 0,
    "react/prop-types": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/require-extension": 0,
    "react/jsx-filename-extension": [ 1, { "extensions": [ ".js", ".jsx" ] } ],
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "react/no-danger": 0,
    "react/jsx-no-bind": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-array-index-key": 0,
    "react/no-find-dom-node": 0,
    "react/no-unused-state": 0,
    "react/no-unused-prop-types": 0,
    "react/default-props-match-prop-types": 0,
    "react/jsx-curly-spacing": 0,
    "react/no-render-return-value": 0,
    "object-curly-newline": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "no-redeclare": 0,
    "no-restricted-globals": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0
  }
}
```

## 开发模式调试主题

在你通过上面步骤建立的主题目录下运行命令

```bash
# 进入目录
cd create-react-doc-theme-load-react
# 将 create-react-doc-theme-load-react 安装到全局目录中
npm link
# /lib/node_modules/create-react-doc-theme-load-react -> ~/rdoc/create-react-doc-theme-load-react
```

生成一个 `create-react-doc` 文档工程

```bash
npm install -g create-react-doc # 全局安装 create-react-doc 工具
create-react-doc init dochelp   # 生成一个叫 dochelp 的工程
```

安装你自定义的主题 `create-react-doc-theme-load-react`

```bash
npm link create-react-doc-theme-load-react
```

在 `dochelp` 工程的 `package.json` 中添加配置

```diff
{
  "name": "dochelp",
  "version": "1.0.0",
  "description": "Describe create-react-doc-theme-load-react here",
  "private": true,
  "scripts": {
    "deploy": "rdoc --publish <your repo url>",
    "build": "rdoc -d home,introduce,faq,about,github --clean --build",
    "start": "rdoc -d home,introduce,faq,about,github --clean"
  },
  "keywords": [],
+  "rdoc": {
+    "theme": "create-react-doc-theme-load-react"
+  },
  "dependencies": {
    "rdoc": "1.4.x"
  },
  "author": "",
  "license": "MIT"
}
```

## 主题发布到npm

如果主题发布到外网，你可以将主题作为一个依赖来使用主题，首先你需要注册一个账号 http://npmjs.org/ ，在命令行中登录你的账号，或者直接在命令行通过 `npm` 命令注册账号。

```bash
# 登录 npm 账号
npm login
# 进入主题的根目录
cd create-react-doc-theme-load-react
# 上传你的主题包，上传记得编译好你的主题哦
npm publish
```
