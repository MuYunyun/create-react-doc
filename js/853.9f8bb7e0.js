(self.webpackChunkcreate_react_doc=self.webpackChunkcreate_react_doc||[]).push([[853],{15853:n=>{n.exports='                                                     _.-"\\\n                                                _.-"      \\\n                                              ,-"          \\\n                                              \\    create    \\\n                                              \\ \\    react    \\\n                                              \\ \\      doc     \\\n                                                \\ \\         _.-;\n                                                \\ \\    _.-"   :\n                                                  \\ \\,-"    _.-"\n                                                  \\(   _.-"\n                                                    `--"\n\n[![npm version](https://img.shields.io/npm/v/create-react-doc)](https://badge.fury.io/js/create-react-doc)\n[![week download](https://img.shields.io/npm/dw/create-react-doc.svg)](https://www.npmjs.com/package/create-react-doc)\n![views](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views.svg)\n![views](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views_per_week.svg)\n![clones](https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/clones_per_week.svg)\n![LICENSE MIT](https://img.shields.io/npm/l/create-react-doc.svg)\n\n[English](./README-en.md) | 简体中文\n\n# Create React Doc\n\n[Create React Doc](https://github.com/MuYunyun/create-react-doc) 是一个使用 React 的 markdown 文档站点生成工具。就像 [create-react-app](https://github.com/facebook/create-react-app) 一样，开发者可以使用 Create React Doc 来开发、部署文档或者博客站点而无需关心额外的环境配置信息。\n\n## 特性\n\n* 建站理念: 文件即站点 (Files as a Site)。\n* 开箱即用: 通过指定目录或文档, 一键生成文档、博客站点, 无需关心站点环境配置信息。\n* 性能: 文档支持懒加载提升站点加载速度。\n* 个性化: 支持[自定义主题](http://muyunyun.cn/create-react-doc/#/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)。\n* 工作流: 集成 Github action, 支持自动化打包、发布站点。\n\n> [快速上手](http://muyunyun.cn/create-react-doc/#/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)\n\n## 主题\n\ncreate-react-doc 提供了官方默认主题 [crd-seed](https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-seed)。该主题支持以下特性:\n\n* 适配移动、PC 多端展示。\n* 支持暗黑模式。\n* 文档支持内嵌 codepen、codesansbox。\n* GitHub 联动。\n\n使用该主题搭建的站点有:\n\n* [blog](http://muyunyun.cn/blog)\n  * ![](http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg)\n  * ![](http://with.muyunyun.cn/2e7440e4256debda2d73a4e6392c7146.jpg-300)\n* [diana](https://muyunyun.cn/diana/)\n\n如果您想定制化或者分享个人主题, 可以参考[自定义主题](http://muyunyun.cn/create-react-doc/#/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)章节。\n\n## 快速上手\n\n**create-react-doc** 非常容易上手。开发者不需要额外安装或配置 webpack 或者 Babel 等工具，它们被内置隐藏在脚手架中，因此开发者可以专心于文档的书写。\n\n如果你想在当前文件下建立站点文件 `doc`, 这里提供如下三种方式快速建站:\n\n### npx\n\n```bash\nnpx create-react-doc doc\n```\n\n### npm\n\n```bash\nnpm init create-react-doc doc\n```\n\n### yarn\n\n```bash\nyarn create react-doc doc\n```\n\n![](http://with.muyunyun.cn/0f0cf6e8cb68b18399eac2927f74b063.jpg)\n\n> 如果想把模板内容内容拉取到当前文件夹, 则可以将如上命令的 `doc` 替换为 `.`, 比如执行 `npx create-react-doc .`。\n\n接着执行 `cd doc && yarn && yarn start`, 可以在 `localhost: 3000` 预览站点, 如果站点文档发生改变, 站点将自动重新加载。\n\n<img src="http://with.muyunyun.cn/2bbd4d8da3165e1a09a88f5e6a114009.jpg" width="900" />\n\n## 站点发布\n\n在 [快速上手](http://muyunyun.cn/create-react-doc/#/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B) 一节中介绍了如何快速搭建站点, 本节将介绍如何将搭建好的站点打包、发布到 gh-pages。\n\n### 自动打包发布到 gh-pages (推荐)\n\n初始化的模板项目集成了 `Github action` 的 [ci 配置](https://github.com/MuYunyun/create-react-doc/blob/main/packages/templates/default/.github/workflows/gh-pages.yml), 使用方只需在 main 分支执行 `git push` 即可以完成站点的自动部署。\n\n![](http://with.muyunyun.cn/ea24d511f76efe5ba5d13bb6b1609aac.jpg)\n\n如果是第一次部署, 在执行以下操作后, 需要在项目的 setting 选项卡中将 Github Pages 选择为 gh-pages。(详情见 [First Deployment with GITHUB_TOKEN](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token))\n\n```bash\ngit init\ngit add .\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin https://github.com/用户或组织名/项目名.git\ngit push -u origin main\n```\n\n> 更多内容可以访问 [站点发布](http://muyunyun.cn/create-react-doc/#/%E7%AB%99%E7%82%B9%E5%8F%91%E5%B8%83)、[高阶用法](http://muyunyun.cn/create-react-doc/#/%E9%AB%98%E9%98%B6%E7%94%A8%E6%B3%95)、[其它工具](http://muyunyun.cn/create-react-doc/#/%E5%85%B6%E5%AE%83%E5%B7%A5%E5%85%B7) 等章节。\n'}}]);