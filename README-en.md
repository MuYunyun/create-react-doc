                                                     _.-"\
                                                _.-"      \
                                              ,-"          \
                                              \    create    \
                                              \ \    react    \
                                              \ \      doc     \
                                                \ \         _.-;
                                                \ \    _.-"   :
                                                  \ \,-"    _.-"
                                                  \(   _.-"
                                                    `--"

[![npm version](https://img.shields.io/npm/v/create-react-doc)](https://badge.fury.io/js/create-react-doc) [![week download](https://img.shields.io/npm/dw/create-react-doc.svg)](https://www.npmjs.com/package/create-react-doc) ![LICENSE MIT](https://img.shields.io/npm/l/create-react-doc.svg)

English | [简体中文](./README.md)

# Create React Doc

Create React Doc is a markdown doc site generator for React. You can write markdown sites or blogs with no build configuration just like [create-react-app](https://github.com/facebook/create-react-app).

## Features

* Write markdown docs with no build configuration.
  * Dark Mode.
  * Support search global.
  * Mobile Friendly.
* Lazy load and Hot load for markdown data.
* Generate menu autoly based file directory.
* Support deploy to [GitHub Pages](https://pages.github.com/).

## Sites built with create-react-doc

* [muyunyun's blog](http://muyunyun.cn/blog)
* [create react doc](http://muyunyun.cn/create-react-doc)

![](http://with.muyunyun.cn/ec330b8ac2175c828be41f446f9f9619.jpg)

## Quick Overview

```bash
npx create-react-doc my-doc
npm install && cd my-doc
npm start
```

Then open [http://localhost:3000/]() to see your doc.
When you're ready to deploy to production, create a minified bundle with npm run build.

## Usage

**create-react-doc** is very easy to use. You don’t need to install or configure tools like webpack or Babel. They are preconfigured and hidden so that you can focus on the doc.

You can choose any one kind way to create a doc site as follow:

### npx

```bash
npx create-react-doc my-doc
```

### npm

```bash
npm init create-react-doc my-doc
```

### yarn

```bash
yarn create react-doc my-doc
```

Once the installation is done, you can open your project folder:

```
npm install && cd my-doc
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the doc in development mode.
Open [http://localhost:3000]() to view it in the browser.

The page will automatically reload if you make changes to the code.

### `npm run build` or `yarn build`

Builds the doc for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your doc site is ready to be deployed.

### `npm run deploy` or `yarn deploy`

The doc'll deployed to GitHub Pages rely `user`, `repo` in [config.yml](https://github.com/MuYunyun/create-react-doc#configyml)

## config.yml

There is some configuration provided for you to adjust doc sites.

```bash
# Site title
title: Time Flying

# Point witch files to show as Menu
## you can also set detailed dir, such as BasicSkill/css
menu: React,BasicSkill,Algorithm
## set init open menu keys
menuOpenKeys: /BasicSkill

# Github
## if you want to show editing pages on github or deploy to GitHub Pages, you should config these arguments.
user: MuYunyun
repo: blog
branch: main              # the default value of branch is main
deploy_branch: gh-pages   # which branch to deploy.(default: gh-pages)
# publish:                # if you want upload to gitlab or other git platform, you can set full git url in it

# use search plugin: provide ability for searching site globally in the site.
# default value: true
search: true
# host: ''                # the url host to search
# search_map: {}          # search_map is connected to menu props

# Available values: en| zh-cn
language: en
```

## Advanced Usage

* If you not want to show some private files, you can set it in `.gitignore`, and the file'll be ignored to show in the docs.