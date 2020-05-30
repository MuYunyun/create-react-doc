<!--
title: 创建网站 
sort: 4
-->

根据你创建的目录结构，配置命令生成网站

## 配置命令

如果你全局安装了 `rdoc` 工具，下面配置的命令直接可以运行，但是不建议这么干，推荐将下面命令到 `package.json` 中

> 1. `-d tutorial,doc` 参数 `-d` 指定 Markdown 所在的目录。  
> 2. 目录是有顺序的，用英文`,`逗号间隔不同的目录。  
> 3. 目录顺序也可以通过每个目录中的 README.md 改变顺序。  
> 4. `--clean` 参数，在每次启动的时候清理缓存替身文件。   

```shell
$ rdoc -d home,introduce,faq,example,about,github --clean
```

## 配置npm命令

将上面命令实例，添加到 `package.json` 的 `scripts` 中。实例如下：

> `package.json`可以通过命令生成 `npm init -y`  

```diff
{
  "name": "doc-example",
  "description": "Describe doc-example here",
  "scripts": {
+    "start": "rdoc -d home,introduce,faq,example,about,github --clean"
  },
  "license": "MIT"
}
```

当前项目安装 rdoc 工具：

```diff
{
  "name": "doc-example",
  "description": "Describe doc-example here",
  "scripts": {
    "start": "rdoc -d home,introduce,faq,example,about,github --clean"
  },
+  "dependencies": {
+    "rdoc": "1.2.x"
+  },
  "license": "MIT"
}
```

## 运行命令

命令配置好之后，你就可以，通过 `npm` 运行它，将自动打开网址 http://localhost:5858/。

```shell
$ npm run start

## Compiled successfully!

## You can now view doc-example in the browser.

##  Local:            http://localhost:5858/
##  On Your Network:  http://192.168.188.109:5858/

## Note that the development build is not optimized.
## To create a production build, use npm run build.
```
