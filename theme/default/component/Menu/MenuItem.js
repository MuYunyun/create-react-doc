import * as React from 'react';
import cx from 'classnames';
import { getMenuStyle } from './util';
import { useMenuContext } from './context';
import styles from './style/index.less';

function MenuItem({
  title = '',
  icon,
  keyValue = '',
  level = 0,
}) {
  const { theme, selectedKey, mode, inlineCollapsed, onSelect, onHoverKey } = useMenuContext();

  const handleOnClick = () => {
    // 垂直模式关闭弹框, Todo
    if (mode === 'vertical') {
      // setChildMenuHover(false)
      // setParentMenuHover(false)
    }
    onSelect(keyValue);
  };

  const renderMenuItem = () => {
    return (
      <li
        className={cx(styles['menu-item'], styles[`menu-${theme}`], {
          [styles['menu-item-selected']]:
            selectedKey && selectedKey.split('').indexOf(keyValue) > -1,
        })}
        onMouseEnter={() => {
          onHoverKey(keyValue);
        }}
        onMouseLeave={() => onHoverKey('')}
        onClick={handleOnClick}
        style={getMenuStyle(level, mode)}
      >
        {icon}
        <span className={cx(styles['menu-item-title'])}>{title}</span>
      </li>
    );
  };

  if (inlineCollapsed === true && level === 0) {
    if (theme === 'dark') {
      return (
        // <Tooltip
        //   content={<div className={cx('menu-tooltip-dark')}>{title}</div>}
        //   placement="right"
        //   portalPadding={0}
        //   arrowStyle={{ background: '#000' }}
        // >
        //   {renderMenuItem()}
        // </Tooltip>
        <div>Tooltip</div>
      );
    }
    return (
      <div>Tooltip</div>
      // <Tooltip content={title} placement="right">
      //   {renderMenuItem()}
      // </Tooltip>
    );
  }

  return renderMenuItem();
}

export default MenuItem;
