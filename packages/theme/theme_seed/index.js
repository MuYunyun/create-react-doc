import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BasicLayout from './layout';
import NoMatch from './component/NoMatch';
import './index.less';

// run in the Web/Router.js
const ThemeSeed = (props) => {
  return (
    // todo: to use custom theme here.
    <Switch>
      <Route
        path="/404"
        render={routeProps => <NoMatch {...routeProps} {...props} />}
      />
      <Route
        path="/"
        render={(routeProps) => {
          return <BasicLayout {...routeProps} {...props} />;
        }}
      />
    </Switch>
  );
};

export default ThemeSeed;
