<p align="center">
  <img width="150" src="theme/default/crd.logo.svg?sanitize=true">
</p>

# Create React Doc

Write markdown sites or blogs with no build configuration.

## Features

* Write markdown docs with no build configuration.
* Lazy load for markdown data.
* Generate menu autoly based file directory.
* Support deploy to [GitHub Pages](https://pages.github.com/).

## Sites built with create-react-doc

* [blog](https://github.com/MuYunyun/blog)

## Quick Overview

```js
npx create-react-doc my-doc
cd my-doc
npm start
```

Then open [http://localhost:3000/]() to see your app.
When you're ready to deploy to production, create a minified bundle with npm run build.

## Usage

**create-react-doc** is very easy to use. You don’t need to install or configure tools like webpack or Babel. They are preconfigured and hidden so that you can focus on the code.

you only install it as a package so that you can create your own website or blog. Let's start!




Create a project, and you’re good to go.

## Start

### Creating a Doc

Install `create-react-doc` to global system，make sure `Node >= 8` in your computer.

```bash
npm install create-react-doc -g
```

1. init project.

```bash
react-doc init doc
```

2. run.

```bash
cd doc && npm install
npm start
```

3. build static html resource.

```bash
npm run build
```

4. config deploy url in `package.json`.

```js
{
  "scripts": {
    "deploy": "react-doc --deploy"
    ...
  },
  ...
}
```

5. deploy your own website.

```bash
npm run deploy
```

## Document

### CLI

```shell
Usage: react-doc [options]

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  start                  Documents generated.
  build                  Build the documents generated.
  deploy                 Deploy site to gh-page.
  -h, --help             help document.
```
