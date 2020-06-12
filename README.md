<p align="center">
  <a href="https://react-doc.github.io">
    <img width="150" src="theme/default/crd.logo.svg?sanitize=true">
  </a>
</p>

create-react-doc
---

* Fast static site generator for React.
* You only just write **Markdown**.
* Files is just Blog.

> If you want some features not included there, you can list in [version 1.0 RFC](https://github.com/MuYunyun/create-react-doc/issues/2).

## Quick Overview

### Get Started Immediately

Get Started Immediately
You don't need to install or configure tools like webpack or Babel.
They are preconfigured and hidden so that you can focus on the code.

Create a project, and you’re good to go.

## Start

**create-react-doc** is very easy to use, you only install it as a package so that you can create your own website or blog. Let's start!

### Creating an Doc

Install `create-react-doc` to global system，make sure `Node >= 8` in your computer.

```bash
npm install create-react-doc -g
```

1. init project.

```bash
create-react-doc init my-project
```

2. run.

```bash
cd my-project && npm install
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
    "deploy": "create-react-doc --publish <your repo url>"
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
Usage: create-react-doc [options]

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  -d, --doc <path>       Other documents generated.
  -o, --output <path>    Writes the compiled file to the disk directory.（default:.crd-dist）
  -p, --port [number]    The port.(default: 5858)
  --host [host]          The host. (default: 0.0.0.0)
  -b, --branch <branch>  Name of the branch you are pushing to.（default: gh-pages）
  --publish [url]        Other documents generated.
  --build                Creating an optimized production build.
  -h, --help             help document.
```

### Use Case

* [blog](https://github.com/MuYunyun/blog)