import { IconsInfo } from './iconsInfo';

/* tslint:disable:max-line-length */
// inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
// Much simplified, do make sure run this after document ready
const svgSprite = contents => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="__CRD_SVG_SPRITE_NODE__"
    style="display:none;overflow:hidden;width:0;height:0"
  >
    <defs>
      ${contents}
    </defs>
  </svg>
`;
/**
 * '<svg viewBox="0 0 1024 1024"><path ..."/></svg>' =>
 * ' viewBox="0 0 1024 1024"><path ..."/></'
 */
const handleSvgContent = (svgContent) => {
  return svgContent.split('svg')[1];
};

const renderSvgSprite = (props) => {
  const { svgContent, type } = props;
  const customIconsInfo = svgContent
    ? {
      [`${type}`]: svgContent,
    }
    : {};
  const mergeSvgInfo = { ...IconsInfo, ...customIconsInfo };
  const symbols = Object.keys(mergeSvgInfo)
    .map((iconName) => {
      const getContent = handleSvgContent(mergeSvgInfo[iconName]);
      return `<symbol id=${iconName}${getContent}symbol>`;
    })
    .join('');
  return svgSprite(symbols);
};

const loadSprite = (props) => {
  const { type, svgContent } = props;
  if (!document) {
    return;
  }
  const existing = document.getElementById('__CRD_SVG_SPRITE_NODE__');
  const mountNode = document.body;

  if (!existing) {
    mountNode &&
      typeof mountNode.insertAdjacentHTML === 'function' &&
      mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite(props));
  } else if (svgContent) {
    const defs = existing.children[0];
    const svgChildren = defs.children;
    const svgChildrenIds = svgChildren ? [].slice.call(svgChildren).map(r => (r).id) : [];
    if (svgChildrenIds.indexOf(type) !== -1) return;
    defs.innerHTML += `<symbol id=${type}${handleSvgContent(svgContent)}symbol>`;
  }
};

export default loadSprite;
