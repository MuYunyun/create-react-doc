/* 获取 menu 样式
  level: 层级
*/
const getMenuStyle = (level, mode) => {
  const basicStyle = {
    fontSize: level === 0 ? '14px' : '12px',
  };
  if (mode === 'inline') {
    return {
      ...basicStyle,
      paddingLeft: `${level * 16}px`,
    };
  }

  return basicStyle;
};

export { getMenuStyle };
