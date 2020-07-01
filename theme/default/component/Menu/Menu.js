import * as React from 'react';
import cx from 'classnames';
import MenuItem from './MenuItem';
import { SubMenu } from './SubMenu';
import { MenuProvider } from './context';
import styles from './style/index.less';

const Menu = ({
  theme = 'light',
  children,
  selectedKey,
  onSelect = () => {},
  inlineCollapsed = false,
  defaultOpenKeys = [],
  menuStyle,
  toggle,
}) => {
  /* 存储 hover 状态的 key 值, 在垂直模式中需要根据 hover 的 key 值高亮父节点 */
  const [hoverKey, setHoverKey] = React.useState('');
  const MenuContext = {
    theme,
    mode: 'inline',
    inlineCollapsed,
    defaultOpenKeys,
    selectedKey,
    onSelect,
    hoverKey,
    onHoverKey: setHoverKey,
  };
  const renderToggle = () => {
    return (
      <div
        className={cx(styles.toggle, {
          [`${styles['toggle-collapsed']}`]: inlineCollapsed,
        })}
        onClick={toggle}
      >
        <i
          className={cx(styles['toggle-icon'], {
            [`${styles['toggle-icon-close']}`]: inlineCollapsed,
          })}
        />
      </div>
    );
  };
  const renderMenu = () => {
    return (
      <ul
        className={cx(
          styles.menu,
          styles[`menu-${theme}`],
          styles['menu-inline'],
          {
            [styles['menu-inline-collapsed']]: inlineCollapsed,
          }
        )}
        style={menuStyle}
      >
        {children}
      </ul>
    );
  };

  return (
    <MenuProvider value={MenuContext}>
      {renderToggle()}
      {renderMenu()}
    </MenuProvider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
