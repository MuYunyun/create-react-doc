(self.webpackChunkcreate_react_doc=self.webpackChunkcreate_react_doc||[]).push([[9696],{29696:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});var r=n(59713),a=n.n(r),c=n(6479),i=n.n(c),o=(n(67294),n(3905));function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function s(e){var t=e.components,n=i()(e,["components"]);return(0,o.kt)("wrapper",l(l(l({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",null,"高阶用法"),(0,o.kt)("p",null,"与 git 文件结构类似, 如果在展示的文件夹中有私有文件不方便展示在文档站点, 可以在 ",(0,o.kt)("inlineCode",{parentName:"p"},".gitignore")," 文件中设置过滤文件, 这样它们就不会展示在文档站点中了。eg: ",(0,o.kt)("a",l({parentName:"p"},{href:"https://github.com/MuYunyun/blog/blob/main/.gitignore"}),".gitignore")),(0,o.kt)("h3",null,"插入自定义脚本"),(0,o.kt)("p",null,"在 ",(0,o.kt)("inlineCode",{parentName:"p"},"config.yml")," 文件中加入 ",(0,o.kt)("inlineCode",{parentName:"p"},"inject")," 字段。"),(0,o.kt)("pre",null,(0,o.kt)("code",l({parentName:"pre"},{className:"language-diff"}),"+ inject: injectLogic/index.js\n")),(0,o.kt)("p",null,"然后在根目录新建与 ",(0,o.kt)("inlineCode",{parentName:"p"},"inject")," 字段相对应的文件, 声明 ",(0,o.kt)("inlineCode",{parentName:"p"},"injectWithPathname")," 函数, 写入",(0,o.kt)("a",l({parentName:"p"},{href:"https://github.com/MuYunyun/create-react-doc/injectLogic/index.js"}),"自定义逻辑"),"。"),(0,o.kt)("pre",null,(0,o.kt)("code",l({parentName:"pre"},{className:"language-js"}),"// perf injectWithPathname logic every pathname changes\nconst injectWithPathname = (pathname) => {}\n\nmodule.exports = { injectWithPathname }\n")))}s.isMDXComponent=!0}}]);