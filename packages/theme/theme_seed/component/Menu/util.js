/* 获取 menu 样式
  level: 层级
*/
const getMenuStyle = (level, type) => {
  const basicStyle = {
    fontSize: level === 0 ? '14px' : '12px',
  };
  if (type === 'menuItem') {
    return {
      ...basicStyle,
      paddingLeft: `${21 + (level * 16)}px`,
    };
  }
  return {
    ...basicStyle,
    paddingLeft: `${level * 16}px`,
  };
};

export { getMenuStyle };
