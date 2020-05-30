import React, { PureComponent } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BasicLayout.less';
import Header from '../component/Header';
import Footer from '../component/Footer';
import logo from '../rdoc.logo.svg';

function getCurrentArticle(routeData, path) {
  let article = null;
  routeData.forEach((item) => {
    if (item.path === path) {
      article = item.article;
    }
  });
  return article;
}

export default class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {
    this.scrollToTop();
  }
  componentDidMount() {
    this.scrollToTop();
  }
  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  renderSubMenuItem(menus) {
    const { location: { pathname } } = this.props;
    if (menus.length > 1) {
      menus = menus.sort((a, b) => {
        if (a.sort < b.sort) return -1;
        if (a.sort > b.sort) return 1;
        return 0;
      });
    }
    return (
      <ul>
        {
          menus.map((item, index) => {
            if (item.isEmpty) {
              return null;
            }
            if (item.children && item.children.length < 1) return null;
            if (item.props && item.props.visible === true) return null;
            if (/^README(.*)md$/.test(item.name)) return null;
            return (
              <li key={index}>
                <div className={classNames({ active: pathname === item.routePath })}>
                  {item && item.props && (item.props.redirect || item.props.isEmpty) ? <div>{(item.mdconf && item.mdconf.title) || ''}</div> : (
                    <Link to={item.routePath} replace={pathname === item.routePath}>
                      {item && item.mdconf.title ? item.mdconf.title : item.name}
                    </Link>
                  )}
                </div>
                {item.children && item.children.length > 0 && this.renderSubMenuItem(item.children)}
              </li>
            );
          })
        }
      </ul>
    );
  }
  renderSubMenu(menus) {
    const { location: { pathname }, routeData } = this.props;
    const article = getCurrentArticle(routeData, pathname);
    menus = menus.filter(item => item.article === article);
    if (menus.length < 1) return null;
    const menusObject = menus[0] && menus[0].children ? menus[0].children : [];
    return this.renderSubMenuItem(menusObject);
  }
  isCurentChildren() {
    const { location: { pathname }, menuSource, routeData } = this.props;
    const getRoute = routeData.filter(item => pathname === item.path);
    const article = getRoute.length > 0 ? getRoute[0].article : null;
    const childs = menuSource.filter(item => article === item.article && item.children && item.children.length > 1);
    return childs.length > 0;
  }
  render() {
    const { menuSource, routeData, indexProps } = this.props;
    const isChild = this.isCurentChildren();
    return (
      <div className={styles.wapper} >
        <Header logo={logo} href="/" location={this.props.location} indexProps={indexProps} menuSource={menuSource} />
        <div className={styles.wapperContent}>
          {isChild && (
            <div className={styles.menuWapper}> {this.renderSubMenu(menuSource)} </div>
          )}
          <div className={classNames('content', {
            [`${styles.content}`]: isChild,
            [`${styles.contentNoMenu}`]: !isChild,
          })}
          >
            <Switch>
              {routeData.map((item) => {
                // 重定向跳转
                if (item && item.mdconf && item.mdconf.redirect) {
                  let redirectPath = `${item.path || ''}/${item.mdconf.redirect}`;
                  redirectPath = redirectPath.replace(/^\/\//, '/');
                  return (
                    <Route key={item.path} exact path={item.path} render={() => <Redirect to={redirectPath} />} />
                  );
                }
                return (
                  <Route key={item.path}
                    exact
                    path={item.path}
                    render={() => {
                      const Comp = item.component;
                      return <Comp {...item} />;
                    }}
                  />
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
