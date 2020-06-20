import * as React from 'react';
import cx from 'classnames';
import Transition from './transition';
import { getMenuStyle } from './util';
import { useMenuContext } from './context';
import styles from './style/index.less';

const { useState, useRef, useLayoutEffect } = React;

function useCurrent(
  initialValue
) {
  const currentRef = useRef(initialValue);
  const [state, setState] = useState(initialValue);
  currentRef.current = state;
  const set = (value) => {
    currentRef.current = value;
    setState(value);
  };
  const get = () => currentRef.current;
  return [get, set];
}

function SubMenu({
  children,
  title,
  icon,
  level = 0,
  keyValue = '',
  onTitleClick = () => {},
}) {
  const {
    selectedKey,
    mode,
    hoverKey,
    onHoverKey,
    defaultOpenKeys = [],
  } = useMenuContext();
  const [menuOpen, setMenuOpen] = useState(defaultOpenKeys.indexOf(keyValue) !== -1);
  const curSubmenu = useRef(null);
  const popupSubMenu = useRef(null);

  const [getParentMenuHover, setParentMenuHover] = useCurrent(false);
  const [getChildMenuHover, setChildMenuHover] = useCurrent(false);

  const gapDistance = 4;
  const delayTime = 24;
  /** 使用 useLayoutEffect 可以避免 useEffect 产生可见的位移痕迹 */
  useLayoutEffect(() => {
    if (popupSubMenu.current && curSubmenu.current) {
      popupSubMenu.current.style.left = `${curSubmenu.current.getBoundingClientRect().right +
        gapDistance}px`;
      popupSubMenu.current.style.top = `${curSubmenu.current.getBoundingClientRect().top}px`;
    }
  }, [getParentMenuHover()]);

  /**
   * judege if is React Fragment.
   */
  function isReactFragment(variableToInspect) {
    if (variableToInspect.type) {
      return variableToInspect.type === React.Fragment;
    }
    return variableToInspect === React.Fragment;
  }

  /* 行内模式下, 渲染子节点 */
  const renderChild = (child) => {
    return (
      <>{React.Children.map(child || children, (reactNode) => {
        if (!reactNode || typeof reactNode !== 'object') {
          return null;
        }
        const childElement = reactNode;
        if (
          isReactFragment(childElement) &&
              childElement.props.children
        ) {
          return renderChild(childElement.props.children);
        }
        return React.cloneElement(childElement, {
          level: level + 1,
          ...childElement.props,
        });
      })}</>
    );
  };

  const handleParentMouseEnter = () => {
    setParentMenuHover(true);
    // console.log(`parentEnter${level} ChildMenuHover${level}`, getChildMenuHover())

    onHoverKey(keyValue);
  };

  /** vertical 模式下光标移开当前 submenu(父菜单) 进入子 menu 时会有空隙, 为避免在空隙中隐藏掉菜单,
   * 做了如下处理: 如果 24ms 内没有进入子菜单则关闭子菜单窗口 */
  const handleParentMouseLeave = () => {
    setChildMenuHover(false);

    setTimeout(() => {
      // console.log(`parentLeave${level} ChildMenuHover${level}`, getChildMenuHover())
      if (!getChildMenuHover()) {
        setParentMenuHover(false);
      }
    }, delayTime);

    onHoverKey('');
  };

  /* 处理 menu 开闭状态 */
  const handleMenuStatus = () => {
    onTitleClick(keyValue);
    mode === 'inline' && setMenuOpen(!menuOpen);
  };

  /* 判断 subMenu 是否被选中, 当子节点被选中时, 父节点也会被高亮;
    同时在 vertical 模式时, 当子节点被 hover 时, 父节点也会被高亮; */
  const judgeSubmenuSelect = (reactChildren) => {
    const result = React.Children.toArray(reactChildren).some((reactNode) => {
      if (!reactNode || typeof reactNode !== 'object') {
        return false;
      }

      const childElement = reactNode;
      // eslint-disable-next-line no-shadow
      const { keyValue } = childElement.props;
      const originKey = keyValue ? String(keyValue) : '';
      if (childElement.type.name === 'MenuItem') {
        return selectedKey.split('').indexOf(originKey) !== -1 || hoverKey === originKey;
      }
      if (childElement.type.name === 'SubMenu') {
        return judgeSubmenuSelect(childElement.props.children) || hoverKey === originKey;
      }
      return false;
    });
    return result;
  };

  return (
    <li
      className={cx(styles.menu, styles.submenu, styles[`submenu-${mode}`], {
        [styles['submenu-selected']]: judgeSubmenuSelect(children),
      })}
      onMouseEnter={() => onHoverKey(keyValue)}
      ref={curSubmenu}
    >
      <div
        className={cx(styles['submenu-title'])}
        style={getMenuStyle(level, mode)}
        onClick={handleMenuStatus}
        onMouseEnter={handleParentMouseEnter}
        onMouseLeave={handleParentMouseLeave}
      >
        {icon ? <span className={cx(styles['menu-icon'])}>{icon}</span> : null}
        <span className={cx(styles['submenu-title-field'])}>{title}</span>
        <i
          className={cx(styles['submenu-arrow'], {
            [styles['submenu-arrow-open']]: mode === 'inline' && menuOpen,
          })}
        />
      </div>
      {mode === 'inline' ? (
        <Transition isShow={menuOpen}>
          <ul className={cx(styles.menu, styles.submenu)}>
            {renderChild()}
          </ul>
        </Transition>
      ) : null}
    </li>
  );
}

export { SubMenu };
