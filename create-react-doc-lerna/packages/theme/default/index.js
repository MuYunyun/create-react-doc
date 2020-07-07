import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BasicLayout from './layout';
import NoMatch from './component/NoMatch';
import Loading from './component/Loading';
import './index.less';

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

  return (
    <Switch>
      <Route
        path="/404"
        render={routeProps => (
          <NoMatch {...routeProps} {...props} />
        )}
      />
      <Route path="/"
        render={(routeProps) => {
          return (
            <BasicLayout {...routeProps} {...props} />
          );
        }}
      />
    </Switch>
  );
}
