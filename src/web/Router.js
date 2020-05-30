import React from 'react';
import { HashRouter, withRouter, Route, Switch } from 'react-router-dom';
import lazyload from 'react-dynamic-loadable';
import theme from 'rdoc-theme';
import menuSource from './rdoc.tree.data.json';

// 判断目录下是否存在 README.md
// 存在返回路由属性，表示是一个路由
function directoryIsRoute(arr, props = false) {
  if (!arr || arr.length === 0) return false;
  const index = arr.filter(item => item.name === 'README.md' && item.mdconf);
  if (index && index.length > 0) props = { ...index[0] };
  return props;
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
        mdconf: mdconf || {},
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
  const arr = [];
  data.forEach((item) => {
    const routePropsCurrent = `${routePath || ''}/${item.name}`.replace(/.md$/, '');
    if (item.type === 'directory') {
      const getDirReadmeProps = directoryIsRoute(item.children);
      if (item.children && item.children.length > 0 && getDirReadmeProps) {
        const { sort, title, mdconf, ...otherItem } = getDirReadmeProps;
        item.mdconf = mdconf || {};
        item.props = otherItem || { isEmpty: true };
        item.sort = mdconf.sort ? mdconf.sort : 0;
        item.children = menuSourceFormat(item.children, routePropsCurrent, article || item.name);
      } else {
        item.mdconf = { title: item.name };
        item.props = { isEmpty: true };
        item.sort = 0;
        item.children = [];
      }
    } else {
      item.title = item.mdconf && item.mdconf.title ? item.mdconf.title : item.name.replace(item.extension, '');
      item.sort = item.mdconf && item.mdconf.sort ? item.mdconf.sort : 0;
      if (!item.mdconf) {
        item.props = { isEmpty: true };
      }
    }
    item.routePath = routePropsCurrent;
    item.article = article || item.name;
    arr.push(item);
  });
  return arr;
}

const RoutersContainer = withRouter(({ ...props }) => {
  const passProps = {
    routeData: routeData(menuSource),
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
