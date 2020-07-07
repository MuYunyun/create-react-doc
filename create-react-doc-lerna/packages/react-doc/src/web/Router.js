import React from 'react';
import { HashRouter, withRouter, Route, Switch } from 'react-router-dom';
import lazyload from 'react-dynamic-loadable';
import theme from 'crd-theme';
import menuSource from './crd.json';

/**
 * serialize router data
 */
function routeData(data, arrayRoute = [], routePath = '/', article) {
  data.forEach((item) => {
    const routePropsCurrent = `${routePath}${item.name}`.replace(/.md$/, '');
    const { mdconf, ...otherItem } = item;
    arrayRoute.push({
      path: routePropsCurrent,
      mdconf: mdconf || { title: item.name },
      props: { ...otherItem },
      article: article || item.name,
    });
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
      if (item.children && item.children.length > 0) {
        item.title = item.name.replace(item.extension, '');
        item.mdconf = {};
        item.props = { isEmpty: true };
        item.children = menuSourceFormat(item.children, routePropsCurrent, article || item.name);
      } else {
        item.title = item.name.replace(item.extension, '');
        item.mdconf = { title: item.name };
        item.props = { isEmpty: true };
        item.children = [];
      }
    } else {
      item.title = item.mdconf && item.mdconf.title ? item.mdconf.title : item.name.replace(item.extension, '');
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
