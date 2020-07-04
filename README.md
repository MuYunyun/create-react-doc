<p align="center">
  <img width="150" src="theme/default/crd.logo.svg?sanitize=true">
</p>

create-react-doc
---

* Markdown site generator for React.
* You only just write **Markdown** out of the box.
* Generate menu autoly based files directory.
* Configuration customly.

## Use Case

* [blog](https://github.com/MuYunyun/blog)

## Quick Overview

### Get Started Immediately

Get Started Immediately
You don't need to install or configure tools like webpack or Babel.
They are preconfigured and hidden so that you can focus on the doc.

Create a project, and you’re good to go.

## Start

**create-react-doc** is very easy to use, you only install it as a package so that you can create your own website or blog. Let's start!

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

### Help

```shell
Usage: react-doc [options]

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  start                  Documents generated.
  build                  Build the documents generated.
  deploy                 Deploy site to gh-page.
  -h, --help             help document.
```
