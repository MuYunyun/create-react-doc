import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import styles from './IndexLayout.less';
import logo from '../crd.logo.svg';

const IndexLayout = ({ menuSource, indexRoute, indexProps, location }) => {
  return (
    <div className={styles.wrapper}>
      <Header
        logo={logo}
        className={styles.header}
        href="/"
        indexProps={indexProps}
        location={location}
        menuSource={menuSource}
      />
      {/* todo: this is index page fill */}
      {/* <div>Index Page</div> */}
      <Switch>
        {indexRoute &&
          indexRoute.map((item) => {
            item.path = '/';
            // 重定向跳转
            if (item && item.mdconf && item.mdconf.redirect) {
              let redirectPath = `${item.path || ''}/${item.mdconf.redirect}`;
              redirectPath = redirectPath.replace(/^\/\//, '/');
              return (
                <Route
                  key={item.path}
                  exact
                  path={item.path}
                  render={() => <Redirect to={redirectPath} />}
                />
              );
            }
            return (
              <Route
                key={item.path}
                exact
                path={item.path}
                render={() => {
                  const Comp = item.component;
                  return <Comp {...item} />;
                }}
              />
            );
          })}
      </Switch>
      <Footer />
    </div>
  );
};

export default IndexLayout;
