import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import logo from '../crd.logo.svg';
import styles from './IndexLayout.less';

const IndexLayout = ({ menuSource, indexRoute, indexProps }) => {
  return (
    <div className={styles.wrapper}>
      <Header
        logo={logo}
        href="/"
        indexProps={indexProps}
        menuSource={menuSource}
      />
      {/* todo: this is index page fill */}
      {/* <div>Index Page</div> */}
      <Switch>
        {indexRoute &&
          indexRoute.map((item) => {
            console.log('item', item);
            item.path = '/';
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
