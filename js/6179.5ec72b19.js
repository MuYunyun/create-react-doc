(self.webpackChunkcreate_react_doc=self.webpackChunkcreate_react_doc||[]).push([[6179],{36179:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>m});var n=a(59713),r=a.n(n),c=a(6479),p=a.n(c),l=(a(67294),a(3905));function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var o={};function m(e){var t=e.components,a=p()(e,["components"]);return(0,l.kt)("wrapper",i(i(i({},o),a),{},{components:t,mdxType:"MDXLayout"}),(0,l.kt)("pre",null,(0,l.kt)("code",i({parentName:"pre"},{}),'                                                 _.-"\\\n                                            _.-"      \\\n                                          ,-"          \\\n                                          \\    create    \\\n                                          \\ \\    react    \\\n                                          \\ \\      doc     \\\n                                            \\ \\         _.-;\n                                            \\ \\    _.-"   :\n                                              \\ \\,-"    _.-"\n                                              \\(   _.-"\n                                                `--"\n')),(0,l.kt)("p",null,(0,l.kt)("a",i({parentName:"p"},{href:"https://badge.fury.io/js/create-react-doc"}),(0,l.kt)("img",i({parentName:"a"},{src:"https://img.shields.io/npm/v/create-react-doc",alt:"npm version"}))),"\n",(0,l.kt)("a",i({parentName:"p"},{href:"https://www.npmjs.com/package/create-react-doc"}),(0,l.kt)("img",i({parentName:"a"},{src:"https://img.shields.io/npm/dw/create-react-doc.svg",alt:"week download"}))),"\n",(0,l.kt)("img",i({parentName:"p"},{src:"https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views.svg",alt:"views"})),"\n",(0,l.kt)("img",i({parentName:"p"},{src:"https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/views_per_week.svg",alt:"views"})),"\n",(0,l.kt)("img",i({parentName:"p"},{src:"https://raw.githubusercontent.com/MuYunyun/create-react-doc/traffic/traffic-create-react-doc/clones_per_week.svg",alt:"clones"})),"\n",(0,l.kt)("img",i({parentName:"p"},{src:"https://img.shields.io/npm/l/create-react-doc.svg",alt:"LICENSE MIT"}))),(0,l.kt)("p",null,(0,l.kt)("a",i({parentName:"p"},{href:"./README-en.md"}),"English")," | 简体中文"),(0,l.kt)("h1",null,"Create React Doc"),(0,l.kt)("p",null,(0,l.kt)("a",i({parentName:"p"},{href:"https://github.com/MuYunyun/create-react-doc"}),"Create React Doc")," 是一个使用 React 的 markdown 文档站点生成工具。就像 ",(0,l.kt)("a",i({parentName:"p"},{href:"https://github.com/facebook/create-react-app"}),"create-react-app")," 一样，开发者可以使用 Create React Doc 来开发、部署文档或者博客站点而无需关心额外的环境配置信息。"),(0,l.kt)("h2",null,"特性"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"建站理念: ",(0,l.kt)("inlineCode",{parentName:"li"},"文件即站点")," (Files as a Site)。"),(0,l.kt)("li",{parentName:"ul"},"开箱即用: 通过指定目录或文档, 一键生成文档、博客站点, 无需关心站点环境配置信息。"),(0,l.kt)("li",{parentName:"ul"},"性能: 通过",(0,l.kt)("inlineCode",{parentName:"li"},"预渲染"),"、",(0,l.kt)("inlineCode",{parentName:"li"},"懒加载"),"大幅提升站点加载速度。"),(0,l.kt)("li",{parentName:"ul"},"基于 mdx: 支持在 markdown 中",(0,l.kt)("inlineCode",{parentName:"li"},"书写 React 组件"),"、数学公式等。"),(0,l.kt)("li",{parentName:"ul"},"搜索引擎优化: ",(0,l.kt)("inlineCode",{parentName:"li"},"支持 SEO"),", 让文档更易被搜索。相关文档: ",(0,l.kt)("a",i({parentName:"li"},{href:"https://github.com/MuYunyun/blog/issues/84"}),"SEO 在 SPA 站点中的实践")),(0,l.kt)("li",{parentName:"ul"},"个性化: 支持",(0,l.kt)("a",i({parentName:"li"},{href:"http://muyunyun.cn/create-react-doc/%E4%B8%BB%E9%A2%98/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98"}),"自定义主题"),"。"),(0,l.kt)("li",{parentName:"ul"},"工作流: 集成 Github action, 支持自动化打包、发布站点。")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B"}),"快速上手"))),(0,l.kt)("h2",null,"主题"),(0,l.kt)("p",null,"create-react-doc 提供了官方默认主题 ",(0,l.kt)("a",i({parentName:"p"},{href:"https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-seed"}),"crd-seed"),"。该主题支持以下特性:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"适配移动、PC 多端展示。"),(0,l.kt)("li",{parentName:"ul"},"支持暗黑模式。"),(0,l.kt)("li",{parentName:"ul"},"文档支持内嵌 codepen、codesandbox。"),(0,l.kt)("li",{parentName:"ul"},"GitHub 联动。")),(0,l.kt)("p",null,"使用该主题搭建的项目有:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",i({parentName:"li"},{href:"https://github.com/MuYunyun/blog"}),"blog"),", ",(0,l.kt)("a",i({parentName:"li"},{href:"http://muyunyun.cn/blog"}),"站点"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("img",i({parentName:"li"},{src:"http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg",alt:null}))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("img",i({parentName:"li"},{src:"http://with.muyunyun.cn/2e7440e4256debda2d73a4e6392c7146.jpg-300",alt:null}))))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",i({parentName:"li"},{href:"https://github.com/MuYunyun/diana"}),"diana"),", ",(0,l.kt)("a",i({parentName:"li"},{href:"https://muyunyun.cn/diana/"}),"站点"))),(0,l.kt)("p",null,"如果您想定制化或者分享个人主题, 可以参考",(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98"}),"自定义主题"),"章节。"),(0,l.kt)("h2",null,"快速上手"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"create-react-doc")," 非常容易上手。开发者不需要额外安装或配置 webpack 或者 Babel 等工具，它们被内置隐藏在脚手架中，因此开发者可以专心于文档的书写。"),(0,l.kt)("p",null,"如果你想在当前文件下建立站点文件 ",(0,l.kt)("inlineCode",{parentName:"p"},"doc"),", 这里提供如下三种方式快速建站:"),(0,l.kt)("h3",null,"npx"),(0,l.kt)("pre",null,(0,l.kt)("code",i({parentName:"pre"},{className:"language-bash"}),"npx create-react-doc doc\n")),(0,l.kt)("h3",null,"npm"),(0,l.kt)("pre",null,(0,l.kt)("code",i({parentName:"pre"},{className:"language-bash"}),"npm init create-react-doc doc\n")),(0,l.kt)("h3",null,"yarn"),(0,l.kt)("pre",null,(0,l.kt)("code",i({parentName:"pre"},{className:"language-bash"}),"yarn create react-doc doc\n")),(0,l.kt)("p",null,(0,l.kt)("img",i({parentName:"p"},{src:"http://with.muyunyun.cn/0f0cf6e8cb68b18399eac2927f74b063.jpg",alt:null}))),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"如果想把模板内容内容拉取到当前文件夹, 则可以将如上命令的 ",(0,l.kt)("inlineCode",{parentName:"p"},"doc")," 替换为 ",(0,l.kt)("inlineCode",{parentName:"p"},"."),", 比如执行 ",(0,l.kt)("inlineCode",{parentName:"p"},"npx create-react-doc ."),"。")),(0,l.kt)("p",null,"接着执行 ",(0,l.kt)("inlineCode",{parentName:"p"},"cd doc && yarn && yarn start"),", 可以在 ",(0,l.kt)("inlineCode",{parentName:"p"},"localhost: 3000")," 预览站点, 如果站点文档发生改变, 站点将自动重新加载。"),(0,l.kt)("img",{src:"http://with.muyunyun.cn/2bbd4d8da3165e1a09a88f5e6a114009.jpg",width:"900"}),(0,l.kt)("h2",null,"站点发布"),(0,l.kt)("p",null,"在 ",(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B"}),"快速上手")," 一节中介绍了如何快速搭建站点, 本节将介绍如何将搭建好的站点打包、发布到 gh-pages。"),(0,l.kt)("h3",null,"自动打包发布到 gh-pages (推荐)"),(0,l.kt)("p",null,"初始化的模板项目集成了 ",(0,l.kt)("inlineCode",{parentName:"p"},"Github action")," 的 ",(0,l.kt)("a",i({parentName:"p"},{href:"https://github.com/MuYunyun/create-react-doc/blob/main/packages/templates/default/.github/workflows/gh-pages.yml"}),"ci 配置"),", 使用方只需在 main 分支执行 ",(0,l.kt)("inlineCode",{parentName:"p"},"git push")," 即可以完成站点的自动部署。"),(0,l.kt)("p",null,(0,l.kt)("img",i({parentName:"p"},{src:"http://with.muyunyun.cn/ea24d511f76efe5ba5d13bb6b1609aac.jpg",alt:null}))),(0,l.kt)("p",null,"如果是第一次部署, 在执行以下操作后, 需要在项目的 setting 选项卡中将 Github Pages 选择为 gh-pages。(详情见 ",(0,l.kt)("a",i({parentName:"p"},{href:"https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token"}),"First Deployment with GITHUB_TOKEN"),")"),(0,l.kt)("pre",null,(0,l.kt)("code",i({parentName:"pre"},{className:"language-bash"}),'git init\ngit add .\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin https://github.com/用户或组织名/项目名.git\ngit push -u origin main\n')),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"更多内容可以访问 ",(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E7%AB%99%E7%82%B9%E5%8F%91%E5%B8%83"}),"站点发布"),"、",(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E9%AB%98%E9%98%B6%E7%94%A8%E6%B3%95"}),"高阶用法"),"、",(0,l.kt)("a",i({parentName:"p"},{href:"http://muyunyun.cn/create-react-doc/%E5%85%B6%E5%AE%83%E5%B7%A5%E5%85%B7"}),"其它工具")," 等章节。")))}m.isMDXComponent=!0}}]);