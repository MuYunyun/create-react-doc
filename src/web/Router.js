import React from 'react';
import { HashRouter, withRouter, Route, Switch } from 'react-router-dom';
import lazyload from 'react-dynamic-loadable';
import theme from 'crd-theme';
// to research crd.tree.data.json
import menuSource from './crd.tree.data.json';

// 判断目录下是否存在 README.md
// 存在返回路由属性，表示是一个路由
/* eslint-disable */
function directoryIsRoute(arr, props = false) {
  if (!arr || arr.length === 0) return false;
  // console.log('arr', arr);
  const pickReadmeArr = arr.filter(item => item.name === 'README.md' && item.mdconf);
  const extraProps = pickReadmeArr && pickReadmeArr.length > 0 ? pickReadmeArr[0] : {}
  return {
    ...extraProps,
    isEmpty: !!(pickReadmeArr && pickReadmeArr.length === 0),
    mdconf: {}
  };
    // return {
    //   // extension: ".md",

    //   mdconf: {},
    //   // name: "Test1.md",
    //   // path: "/About/Test1.md",
    //   // relative: "/About/Test1.md",
    //   // size: 13,
    //   type: "directory",
    // };
}
// 路由数据序列化
function routeData(data, arrayRoute = [], routePath = '/', article) {
  data.forEach((item) => {
    const routeProps = directoryIsRoute(item.children);
    const routePropsCurrent = `${routePath}${item.name}`.replace(/.md$/, '');
    if (item.type === 'directory' && routeProps) {
      const { mdconf, ...otherItem } = routeProps;
      arrayRoute.push({
        path: routePropsCurrent,
        // mdconf: mdconf || { title: item.name },
        mdconf: mdconf || { title: item.name },
        props: { ...otherItem },
        article: article || item.name,
      });
    } else {
      const { mdconf, ...otherItem } = item;
      arrayRoute.push({
        path: routePropsCurrent,
        mdconf: mdconf || { title: item.name },
        props: { ...otherItem },
        article: article || item.name,
      });
    }
    if (item.children && item.children.length > 0) {
      arrayRoute.concat(routeData(item.children, arrayRoute, `${routePropsCurrent}/`, article || item.name));
    }
  });
  return arrayRoute;
}


function menuSourceFormat(data, routePath, article) {
  // console.log('data', data)
  const arr = [];
  data.forEach((item) => {
    const routePropsCurrent = `${routePath || ''}/${item.name}`.replace(/.md$/, '');
    if (item.type === 'directory') {
      const getDirReadmeProps = directoryIsRoute(item.children);
      if (item.children && item.children.length > 0 && getDirReadmeProps) {
        const { sort, title, mdconf, ...otherItem } = getDirReadmeProps;
        item.title = item.name.replace(item.extension, '');
        item.mdconf = mdconf || {};
        item.props = otherItem || { isEmpty: true };
        item.sort = mdconf.sort ? mdconf.sort : 0;
        item.children = menuSourceFormat(item.children, routePropsCurrent, article || item.name);
      } else {
        item.title = item.name.replace(item.extension, '');
        item.mdconf = { title: item.name };
        item.props = { isEmpty: true };
        item.sort = 0;
        item.children = [];
      }
    } else {
      // console.log("item.mdconf", item);
      item.title = item.mdconf && item.mdconf.title ? item.mdconf.title : item.name.replace(item.extension, '');
      // console.log("item.title", item.title);
      item.sort = item.mdconf && item.mdconf.sort ? item.mdconf.sort : 0;
      if (!item.mdconf) {
        item.props = { isEmpty: true };
      }
    }
    item.routePath = routePropsCurrent;
    item.article = article || item.name;
    arr.push(item);
    /* eslint-disable */
    if (item.type === 'directory') {
      // console.log('arr', arr)
    }
  });
  // todo: to show About、LeetCode in the root menu, to find how arr return.
  return arr;
}

const RoutersContainer = withRouter(({ ...props }) => {
  const passProps = {
    routeData: routeData(menuSource),
    // todo menuSource 的传递
    menuSource: menuSourceFormat(menuSource),
    ...props,
  };
  return (
    <Switch>
      <Route path="/" render={routeProps => theme(lazyload, { ...routeProps, ...passProps })} />
    </Switch>
  );
});

export default function RouterRoot() {
  return (
    <HashRouter>
      <RoutersContainer />
    </HashRouter>
  );
}
