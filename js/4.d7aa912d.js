(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{679:function(n,e){n.exports='                                                     _.-"\\\n                                                _.-"      \\\n                                              ,-"          \\\n                                              \\    create    \\\n                                              \\ \\    react    \\\n                                              \\ \\      doc     \\\n                                                \\ \\         _.-;\n                                                \\ \\    _.-"   :\n                                                  \\ \\,-"    _.-"\n                                                  \\(   _.-"\n                                                    `--"\n\n[![npm version](https://img.shields.io/npm/v/create-react-doc)](https://badge.fury.io/js/create-react-doc) [![week download](https://img.shields.io/npm/dw/create-react-doc.svg)](https://www.npmjs.com/package/create-react-doc) ![LICENSE MIT](https://img.shields.io/npm/l/create-react-doc.svg)\n\n[English](./README-en.md) | 简体中文\n\n# Create React Doc\n\nCreate React Doc 是一个使用 React 的 markdown 文档站点生成工具。就像 [create-react-app](https://github.com/facebook/create-react-app) 一样，开发者可以使用 Create React Doc 来开发、部署 markdown 站点或者博客而不用关心站点环境配置信息。\n\n## 特性\n\n* 零配置书写 markdown 文档站点。\n* markdown 文档支持懒加载以及热加载。\n* 基于文件目录自动生成多层级菜单。\n* 支持一键发布到 [GitHub Pages](https://pages.github.com/).\n\n## 使用 create-react-doc 搭建的文档站点\n\n* [blog](http://muyunyun.cn/blog)\n\n![](http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg)\n\n## 快速上手\n\n执行如下命令:\n\n```bash\nnpx create-react-doc my-doc\nnpm install && cd my-doc\nnpm start\n```\n\n然后打开 [http://localhost:3000/]() 就可以看到文档站点。当准备发布到生产环境时，执行 `npm run build` 就能将文档站点打包压缩。\n\n## 使用\n\n**create-react-doc** 非常容易上手。开发者不需要额外安装或配置 webpack 或者 Babel 等工具，它们被内置隐藏在脚手架中，因此开发者可以专心于文档的书写。\n\n下面提供三种方式来快速创建文档站点:\n\n### npx\n\n```bash\nnpx create-react-doc my-doc\n```\n\n### npm\n\n```bash\nnpm init create-react-doc my-doc\n```\n\n### yarn\n\n```bash\nyarn create create-react-doc my-doc\n```\n\n一旦安装执行完毕，执行 npm install 然后进入项目文件夹:\n\n```\nnpm install && cd my-doc\n```\n\n在新创建的项目中, 可以执行内置的一些命令:\n\n### `npm start` or `yarn start`\n\n在开发者模式下启动文档项目:\n\n在浏览器中打开 [http://localhost:3000]() 预览站点。\n\n如果站点文档发生改变, 站点将自动重新加载。\n\n### `npm run build` or `yarn build`\n\n将要发布的文档站点进行打包构建, 此时的文档网站已准备好进行部署。\n\n### `npm run deploy` or `yarn deploy`\n\n根据 [config.yml](https://github.com/MuYunyun/create-react-doc#configyml) 里的 user 和 repo 参数, 文档站点默认将会发布到 GitHub Pages\n\n## config.yml\n\n可以在站点根目录中的 [config.yml 文件夹](https://github.com/MuYunyun/blog/blob/master/config.yml) 中进行配置站点的功能。\n\n```bash\n# Site title\ntitle: Time Flying\n\n# Point witch files to show as Menu\n## you can also set detailed dir, such as BasicSkill/css\nmenu: React,BasicSkill,Algorithm\n## set init open menu keys\nmenuOpenKeys: /BasicSkill\n\n# Github\n## if you want to show editing pages on github or deploy to GitHub Pages, you should config these arguments.\nuser: MuYunyun\nrepo: blog\nbranch: master            # the default value of branch is master\ndeploy_branch: gh-pages   # which branch to deploy.(default: gh-pages)\n# publish:                # if you want upload to gitlab or other git platform, you can set full git url in it\n\n# Available values: en| zh-cn\nlanguage: en\n```\n\n## 高阶用法\n\n* 与 git 文件结构类似, 如果在展示的文件夹中有私有文件不方便展示在文档站点, 可以在 `.gitignore` 文件中设置过滤文件, 这样它们就不会展示在文档站点中了。eg: [.gitignore](https://github.com/MuYunyun/blog/blob/master/.gitignore)\n* 更多用法: 欢迎在 [issue](https://github.com/MuYunyun/create-react-doc/issues/new) 留言。'}}]);