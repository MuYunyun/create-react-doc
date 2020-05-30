import React from 'react';
import styles from './Link.less';

export default ({ title, href, children }) => {
  let link = href.replace(/(\/|\/show\/|\/show)$/g, '');
  if (
    /^(http(?:|s):)\/\/(jsfiddle.net|runjs.cn|codepen.io|codesandbox.io)/.test(link) &&
    !/^(https|http):\/\/(jsfiddle.net|runjs.cn|codepen.io|codesandbox.io)(?:|\/)$/.test(link)
  ) {
    const regexRunjs = /(https|http):\/\/runjs.cn\/code\/(.*)/gi;
    const regexCodepen = /(https|http):\/\/codepen.io\/(.*)\/pen\/(.*)/gi;
    const regexCodesandbox = /(https|http):\/\/codesandbox.io\/(s|embed)\/(.*)/gi;
    const runjs = regexRunjs.exec(link);
    const codepen = regexCodepen.exec(link);
    const codesandbox = regexCodesandbox.exec(link);
    if (runjs && runjs.length > 2) {
      link = `http://sandbox.runjs.cn/show/${runjs[2]}`;
    } else if (codepen && codepen.length === 4) {
      link = `https://codepen.io/${codepen[2]}/embed/${codepen[3]}?height=400`;
    } else if (codesandbox && codesandbox.length === 4) {
      link = `https://codesandbox.io/embed/${codesandbox[3]}`;
    } else {
      link = `${link}/show/`;
    }
    return (
      <iframe frameBorder={0} allowFullScreen="allowfullscreen" className={styles.frame} src={link} title={link} />
    );
  }
  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
};
