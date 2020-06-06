import React, { PureComponent } from 'react';
/* eslint-disable */
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import Menu from '../component/Menu'
import classNames from 'classnames';
import Header from '../component/Header';
import Footer from '../component/Footer';
import logo from '../rdoc.logo.svg';
import styles from './BasicLayout.less';

const SubMenu = Menu.SubMenu;

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
    /* eslint-disable */
    // debugger
    return (
      <>
        {menus.map((item, index) => {
          // console.log("item", item);
          if (item.props && item.props.visible === false) return null;
          if (/^README(.*)md$/.test(item.name)) return null;
          return item.children && item.children.length > 0 ? (
            <SubMenu title={item.name}>{this.renderSubMenuItem(item.children)}</SubMenu>
          ) : (
            <Menu.Item
              title={
                <div
                  className={classNames({
                    active: pathname === item.routePath,
                  })}
                >
                  {item &&
                  item.type === "directory" &&
                  item.props &&
                  item.props.isEmpty ? (
                    <div>{(item.mdconf && item.mdconf.title) || item.name}</div>
                  ) : (
                    <Link
                      to={item.routePath}
                      replace={pathname === item.routePath}
                    >
                      {item && item.mdconf && item.mdconf.title
                        ? item.mdconf.title
                        : item.name}
                    </Link>
                  )}
                </div>
              }
            />
          );
        })}
      </>
    );
  }
  renderMenu(menus) {
    const { location: { pathname }, routeData } = this.props;
    // const article = getCurrentArticle(routeData, pathname);
    // menus = menus.filter(item => item.article === article);
    if (menus.length < 1) return null;
    const menusObject = menus || [];
    return (
      <Menu
        mode="inline"
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
      >
        { this.renderSubMenuItem(menusObject) }
      </Menu>
    )
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
    // console.log("menuSource", menuSource);
    return (
      <div className={styles.wapper} >
        <Header logo={logo} href="/" location={this.props.location} indexProps={indexProps} menuSource={menuSource} />
        <div className={styles.wapperContent}>
          {isChild && (
            <div className={styles.menuWapper}> {this.renderMenu(menuSource)} </div>
          )}
          <div className={classNames({
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
