import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import BasicLayout from './layout';
import NoMatch from './component/NoMatch';
import Loading from './component/Loading';
import './index.less';

// 获取首页路由参数
const getIndexProps = (menus = [], attr) => {
  menus.forEach((item) => {
    if (item && item.mdconf && item.mdconf.layout === 'IndexLayout') {
      attr = item;
    }
    if (!attr && item.children && item.children.length > 0) {
      attr = getIndexProps(item.children, attr);
    }
  });
  return attr;
};

// run in the Web/Router.js
export default function (Lazyload, props) {
  const LoadableComponent = Lazyload({
    component: () => import('./routes/Pages'),
    LoadingComponent: Loading,
  });

  // routing load component
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
      item.component = LoadableComponent;
      return item;
    });
  }
  // 首页路由
  // 获取自定义路由
  let indexProps = getIndexProps(props.menuSource) || {};
  if (indexProps) {
    props.routeData = props.routeData.filter(item => item.mdconf && item.mdconf.layout !== 'IndexLayout');
  } else {
    // 未定义首页，默认第一个路由当首页
    indexProps = props.routeData.find((item, index) => index === 0);
    if (indexProps) indexProps.mdconf.layout = 'IndexLayout';
  }

  return (
    <Switch>
      <Route
        path="/404"
        render={routeProps => (
          <DocumentTitle title="404">
            <NoMatch {...routeProps} {...props} />
          </DocumentTitle>
        )}
      />
      <Route path="/"
        render={(routeProps) => {
          const { location: { pathname } } = routeProps;
          let curentRoute = props.routeData.filter(item => item.path === pathname);
          let title = [];
          if (curentRoute.length > 0) {
            curentRoute = curentRoute[0];
            if (curentRoute.mdconf && curentRoute.mdconf.title && curentRoute.mdconf.layout !== 'IndexLayout') {
              title.push(curentRoute.mdconf.title);
            }
            title = title.length > 1 ? title.join(' - ') : title.join('');
          } else {
            title = '404';
          }
          return (
            <DocumentTitle title={title}>
              <BasicLayout {...routeProps} {...props} />
            </DocumentTitle>
          );
        }}
      />
    </Switch>
  );
}
