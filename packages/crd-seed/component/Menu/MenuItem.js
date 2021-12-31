import { useEffect, useRef } from 'react'
import cx from 'classnames'
import { getMenuStyle } from './util'
import { useMenuContext } from './context'
import styles from './style/index.less'

function MenuItem({
  title = '',
  icon,
  keyValue = '',
  level = 0,
}) {
  const { theme, selectedKey, onSelect, onHoverKey } = useMenuContext()
  const menuItemRef = useRef(null)
  const menuItemselected = keyValue.indexOf(selectedKey) > -1

  useEffect(() => {
    if (menuItemselected) {
      menuItemRef.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }, [])

  const handleOnClick = () => {
    onSelect(keyValue)
  }

  const renderMenuItem = () => {
    return (
      <li
        className={cx(styles['menu-item'], styles[`menu-${theme}`], {
          [styles['menu-item-selected']]: menuItemselected,
        })}
        onMouseEnter={() => {
          onHoverKey(keyValue)
        }}
        onMouseLeave={() => onHoverKey('')}
        onClick={handleOnClick}
        style={getMenuStyle(level, 'menuItem')}
        ref={menuItemRef}
      >
        {icon ? <span className={cx(styles['menu-icon'])}>{icon}</span> : null}
        <span className={cx(styles['menu-item-title'])}>{title}</span>
      </li>
    )
  }

  return renderMenuItem()
}

export default MenuItem
