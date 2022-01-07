import * as React from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { ifDev, ifProd, ifPrerender } from 'crd-client-utils'
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

const { useState, useEffect } = React
const SubMenu = Menu.SubMenu

function BasicLayout({
  location,
  routeData,
  menuSource,
  indexProps,
  // render area
  pointRender
}) {
  const { pathname } = location
  const { user, repo, branch = 'main', language = 'en', menuOpenKeys } = DOCSCONFIG || {}
  const [inlineCollapsed, setInlineCollapsed] = useState(true)
  const [selectedKey, setSelectedKey] = useState('')
  const curOpenKeys = getOpenSubMenuKeys({
    pathname,
    menuSource,
    menuOpenKeys
  })
  const defaultPath = (routeData.find(data => data.path === '/README')
    && routeData.find(data => data.path === '/README').mdconf
    && routeData.find(data => data.path === '/README').mdconf.abbrlink) || 'README'

  useEffect(() => {
    if (ifPrerender) {
      scrollToTop()
      INJECT?.inject?.()
    }
  }, [])

  useEffect(() => {
    INJECT?.injectWithPathname?.(pathname)
  }, [pathname])

  useEffect(() => {
    const { pathname } = location
    let newPathName = pathname
    // fix https://github.com/MuYunyun/create-react-doc/issues/195
    if (newPathName.endsWith('/')) {
      newPathName = newPathName.slice(0, newPathName.length - 1)
    }
    if (newPathName.startsWith(`/${repo}`)) {
      newPathName = newPathName.slice(`/${repo}`.length, newPathName.length)
    }
    setSelectedKey(newPathName || defaultPath)
  }, location.pathname)

  const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0)
  }
  const renderSubMenuItem = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          const { mdconf, routePath } = item || {}
          const { abbrlink } = mdconf || {}
          const path = abbrlink ? `/${abbrlink}` : routePath
          // item.path carrys .md here.
          return item.children && item.children.length > 0 ? (
            <SubMenu
              key={index}
              keyValue={item.path}
              title={item.name}
              icon={<Icon type="folder" size={16} />}
            >
              {renderSubMenuItem(item.children)}
            </SubMenu>
          ) : (
            <Menu.Item
              key={index}
              icon={<Icon type="file" size={16} />}
              keyValue={abbrlink ? `/${abbrlink}` : item.path}
              title={
                item &&
                item.type === "directory" &&
                item.props &&
                item.props.isEmpty ? (
                  <span>
                    {(item.mdconf && item.mdconf.title) || item.name}
                  </span>
                ) : (
                  <Link
                    to={ifProd ? `/${repo}${path}` : path}
                    replace={pathname.indexOf(path) > -1}
                  >
                    {item && item.mdconf && item.mdconf.title
                      ? item.mdconf.title
                      : item.title}
                  </Link>
                )
              }
            />
          )
        })}
      </>
    )
  }
  const renderMenu = (menus) => {
    if (menus.length < 1) return null

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
            setInlineCollapsed(!inlineCollapsed)
          }}
          menuStyle={{
            height: "100vh",
            overflow: "auto",
          }}
          selectedKey={selectedKey}
          onSelect={(keyValue) => {
            setSelectedKey(keyValue)
          }}
          defaultOpenKeys={curOpenKeys}
        >
          {renderSubMenuItem(menus || [])}
        </Menu>
      </Affix>
    )
  }
  /**
   * this section is to show article's relevant information
   * such as edit in github and so on.
   */
  const renderPageHeader = () => {
    const curMenuSource = routeData.filter(r => {
      if (r.props.type === 'directory') return false
      return pathname.indexOf(r.mdconf.abbrlink) > -1 || decodeURIComponent(pathname).indexOf(r.path) > -1
    })
    const editPathName = curMenuSource[0] && curMenuSource[0].props.path
    return (
      <div className={cx(styles.pageHeader)}>
        {user && repo ? (
          <a
            href={`https://github.com/${user}/${
              repo
            }/edit/${branch}${editPathName}`}
            target="_blank"
          >
            <Icon className={cx(styles.icon)} type="edit" size={13} />
            <span>Edit in GitHub</span>
          </a>
        ) : null}
      </div>
    )
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
              {routeData.find((data) => pathname.indexOf(data.path) > -1).props.mtime}
            </span>
          </span>
        ): null}
      </div>
    )
  }
  const isCurentChildren = () => {
    const getRoute = routeData.filter((data) => pathname.indexOf(data.path) > -1)
    const article = getRoute.length > 0 ? getRoute[0].article : null
    const childs = menuSource.filter(
      (data) =>
        article === data.article && data.children && data.children.length > 1
    )
    return childs.length > 0
  }
  const isChild = isCurentChildren()
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
    )
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
          <Redirect exact from={ifAddPrefix ? `/${repo}` : `/`} to={ifAddPrefix ? `/${repo}/${defaultPath}` : `/${defaultPath}`} />
          {routeData.map((item) => {
            const { path, mdconf, component } = item
            const { abbrlink } = mdconf
            const enhancePath = abbrlink ? `/${abbrlink}` : path
            return (
              <Route
                key={enhancePath}
                exact
                path={ifAddPrefix ? `/${repo}${enhancePath}` : enhancePath}
                render={() => {
                  const Comp = component
                  return <Comp {...item} />
                }}
              />
            )
          })}
          <Redirect to={ifAddPrefix ? `/${repo}/404` : `/404`} />
        </Switch>
        {renderPageFooter()}
      </div>
    )
  }
  return (
    <>
      {
        pointRender === 'menu'
          // prod render
          ? renderMenuContainer()
          // pre & dev render
          : <div className={styles.wrapper}>
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
              <div id="menuPosition">
                {renderMenuContainer()}
              </div>
              {renderContent()}
              <Footer inlineCollapsed={inlineCollapsed} />
            </div>
          </div>
      }
    </>
  )
}

export default BasicLayout
