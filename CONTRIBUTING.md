### Dev

获取代码，进入目录，运行自动重载构建：

```shell
$ git clone https://github.com/MuYunyun/create-react-doc
$ cd create-react-doc     # 进入目录
$ npm install             # or yarn install
```

要开发，请运行自重载构建：

```bash
# 运行应用程序
# 每次代码更改时，自动重新启动应用程序。
# 在开发过程中很有用。
$ npm run start
```

打开浏览器并访问 http://localhost:3000

### Folders

```bash
.
├── README.md
├── .create-react-doc-dist
├── package.json
├── src
│   ├── build.js
│   ├── commands
│   ├── conf
│   ├── publish.js
│   ├── server.js
│   ├── utils
│   └── web
├── templates
│   └── default # 记录静态文件。
└── theme
    └── default
```