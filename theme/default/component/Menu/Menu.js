import * as React from 'react';
import cx from 'classnames';
import MenuItem from './MenuItem';
import { SubMenu } from './SubMenu';
import { MenuProvider } from './context';
import './style/index.less';

const Menu = ({
  mode = 'inline',
  theme = 'light',
  children,
  selectedKey,
  onSelect = () => {},
  inlineCollapsed = false,
  defaultOpenKeys = [],
  width,
}) => {
  /* 存储 hover 状态的 key 值, 在垂直模式中需要根据 hover 的 key 值高亮父节点 */
  const [hoverKey, setHoverKey] = React.useState('');
  const mergeMode = inlineCollapsed ? 'vertical' : mode;
  const MenuContext = {
    theme,
    mode: mergeMode,
    inlineCollapsed,
    defaultOpenKeys,
    selectedKey,
    onSelect,
    hoverKey,
    onHoverKey: setHoverKey,
  };
  const renderMenu = () => {
    return (
      <ul
        className={cx('menu', `menu-${theme}`, `menu-${mergeMode}`, {
          'menu-inline-collapsed': inlineCollapsed,
        })}
        style={{
          width: `${width}px`,
        }}
      >
        {children}
      </ul>
    );
  };

  return <MenuProvider value={MenuContext}>{renderMenu()}</MenuProvider>;
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
