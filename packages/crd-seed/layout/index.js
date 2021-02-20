import { useState, useEffect } from 'react'
// import { Switch, Link, Route } from 'react-router-dom'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import cx from 'classnames'
import Menu from '../component/Menu'
import Icon from '../component/Icon'
import Affix from '../component/Affix'
import Header from '../component/Header'
import Footer from '../component/Footer'
import languageMap from '../language'
import { isMobile, ifAddPrefix } from '../utils'
import { getOpenSubMenuKeys } from './utils'
import logo from '../crd.logo.svg'
import styles from './index.less'
import '../style/mobile.less'

const SubMenu = Menu.SubMenu

function BasicLayout({
  location,
  routeData,
  menuSource,
  indexProps,
}) {
  const { pathname } = location
  // eslint-disable-next-line no-undef
  const { user, repo, branch = 'main', language = 'en', menuOpenKeys } = DOCSCONFIG || {}
  const [inlineCollapsed, setInlineCollapsed] = useState(isMobile)
  const [selectedKey, setSelectedKey] = useState('')
  const curOpenKeys = getOpenSubMenuKeys(pathname, menuOpenKeys)

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    scrollToTop()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    INJECT?.inject?.()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    INJECT?.injectWithPathname?.(pathname)
  }, [pathname])

  useEffect(() => {
    const newPathName = location.pathname
    setSelectedKey(`${newPathName}.md`)
  }, location)

  const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0)
  }
  const renderSubMenuItem = (menus) => {
    /* eslint-disable */
    return (
      <>
        {menus.map((item, index) => {
          // item.path carrys .md here.
          return item.children && item.children.length > 0 ? (
            <SubMenu key={index} keyValue={item.path} title={item.name} icon={<Icon type="folder" size={16} />}>
              {renderSubMenuItem(item.children)}
            </SubMenu>
          ) : (
            <Menu.Item
              key={index}
              icon={<Icon type="file" size={16} />}
              keyValue={item.path}
              title={
                item &&
                item.type === "directory" &&
                item.props &&
                item.props.isEmpty ? (
                  <span>
                    {(item.mdconf && item.mdconf.title) || item.name}
                  </span>
                ) : (
                  window.location.href.indexOf('.crd-dist') > -1
                    ? <a href={`${window.location.href.split('.crd-dist')[0]}.crd-dist${item.routePath}/index.html`}>
                      {item && item.mdconf && item.mdconf.title
                        ? item.mdconf.title
                        : item.title}
                    </a>
                    : <Link
                      to={ifAddPrefix ? `/${repo}${item.routePath}` : item.routePath}
                      // replace={pathname === item.routePath}
                      replace={pathname.indexOf(item.routePath)}
                    >
                      {item && item.mdconf && item.mdconf.title
                        ? item.mdconf.title
                        : item.title}
                    </Link>
                )
              }
            />
          );
        })}
      </>
    );
  };
  const renderMenu = (menus) => {
    if (menus.length < 1) return null;
    return (
      <Affix
        offsetTop={0}
        className={styles.affixPlaceholder}
        wrapperClassName={styles.affixWrapper}
        width={inlineCollapsed ? 0 : 240}
      >
        <Menu
          inlineCollapsed={inlineCollapsed}
          toggle={() => {
            setInlineCollapsed(!inlineCollapsed);
          }}
          menuStyle={{
            height: "100vh",
            overflow: "auto",
          }}
          selectedKey={selectedKey}
          onSelect={(keyValue) => {
            setSelectedKey(keyValue);
          }}
          defaultOpenKeys={curOpenKeys}
        >
          {renderSubMenuItem(menus || [])}
        </Menu>
      </Affix>
    );
  };
  /**
   * this section is to show article's relevant information
   * such as edit in github and so on.
   */
  const renderPageHeader = () => {
    return (
      <div className={cx(styles.pageHeader)}>
        {user && repo ? (
          <a
            href={`https://github.com/${user}/${
              repo
            }/edit/${branch}${pathname}.md`}
            target="_blank"
          >
            <Icon className={cx(styles.icon)} type="edit" size={13} />
            <span>Edit in GitHub</span>
          </a>
        ) : null}
      </div>
    );
  }
  /**
   * this section is to show article's relevant information
   * such as edit in created time、edited time and so on.
   */
  const renderPageFooter = () => {
    // in local env, data.path is to be /READEME, however pathname may be /Users/mac/.../.crd-dist/READEME/index.html
    const matchData = routeData.find((data) => pathname.indexOf(data.path) > -1)
    const matchProps = matchData && matchData.props
    return (
      <div className={cx(styles.pageFooter)}>
        {matchProps && matchProps.birthtime ? (
          <span className={cx(styles.position)}>
            <Icon className={cx(styles.icon)} type="create-time" size={13} />
            {languageMap[language].create_tm}:
            <span>{matchProps.birthtime}</span>
          </span>
        ) : null}
        {matchProps && matchProps.mtime ? (
          <span className={cx(styles.position)}>
            <Icon className={cx(styles.icon)} type="update-time" size={13} />
            {languageMap[language].modify_tm}:
            <span>
              {routeData.find((data) => pathname.indexOf(data.path)).props.mtime}
            </span>
          </span>
        ): null}
      </div>
    );
  }
  const isCurentChildren = () => {
    const getRoute = routeData.filter((data) => pathname.indexOf(data.path));
    const article = getRoute.length > 0 ? getRoute[0].article : null;
    const childs = menuSource.filter(
      (data) =>
        article === data.article && data.children && data.children.length > 1
    );
    return childs.length > 0;
  };
  const isChild = isCurentChildren();
  const renderMenuContainer = () => {
    return (
      <>
        <nav
          className={cx(styles.menuWrapper, {
            [`${styles["menuwrapper-inlineCollapsed"]}`]: inlineCollapsed,
          })}
        >
          {renderMenu(menuSource)}
        </nav>
        <div
          className={cx({
            [`${styles.menuMask}`]: isMobile && !inlineCollapsed,
          })}
          onClick={(e) => {
            e.stopPropagation()
            setInlineCollapsed(true)
          }}
        />
      </>
    );
  }
  const renderContent = () => {
    return (
      <div
        className={cx(`${styles.content}`, {
          [`${styles["content-fullpage"]}`]: inlineCollapsed || isMobile,
        })}
      >
        <Switch>
          {/* see https://reacttraining.com/react-router/web/api/Redirect/exact-bool */}
          <Redirect exact from={ifAddPrefix ? `/${repo}` : `/`} to={ifAddPrefix ? `/${repo}/README` : `/README`} />
          {routeData.map((item) => {
            console.log('item.path', item.path)
            return (
              <Route
                key={item.path}
                exact
                // path={window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender ? pathname : item.path}
                path={ifAddPrefix ? `/${repo}${item.path}` : item.path}
                render={() => {
                  const Comp = item.component;
                  return <Comp {...item} />;
                }}
              />
            );
          })}
          <Redirect to={ifAddPrefix ? `/${repo}/404` : `/404`} />
        </Switch>
        {renderPageFooter()}
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <Header
        logo={logo}
        href={ifAddPrefix ? `/${repo}` : `/`}
        location={location}
        indexProps={indexProps}
        menuSource={menuSource}
      />
      <div
        className={cx(styles.wrapperContent, {
          [styles.wrapperMobile]: isMobile,
        })}
      >
        {renderPageHeader()}
        {renderMenuContainer()}
        {renderContent()}
        <Footer inlineCollapsed={inlineCollapsed} />
      </div>
    </div>
  );
}

export default BasicLayout
