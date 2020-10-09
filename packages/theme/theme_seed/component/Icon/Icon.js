import * as React from 'react';
import cx from 'classnames';
import loadSprite from './loadSprite';
import styles from './style/index.less';

const { useEffect } = React;

/* omit some props depends on arr */
const omit = (props, arr) =>
  Object.keys(props)
    .filter(k => arr.indexOf(k) === -1)
    // eslint-disable-next-line no-sequences
    .reduce((acc, key) => ((acc[key] = props[key]), acc), {});

function Icon(props) {
  const { type, color, prefixCls = 'icon', size, style, className, ...rest } = props;

  useEffect(() => {
    loadSprite(props);
  }, [type]);

  const newClassName = cx(styles[prefixCls], className);
  const cloneStyle = { ...style };
  if (color) {
    cloneStyle.color = color;
  }
  if (size) {
    cloneStyle.fontSize = size;
  }

  const restProps = omit(rest, ['svgContent']);

  return (
    <svg className={newClassName} style={cloneStyle} {...restProps}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

export default Icon;
