/* eslint-disable no-empty */
const inject = () => {
  // demo for using mathjax. see https://github.com/MuYunyun/create-react-doc/issues/63
  (function () {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
      },
      svg: {
        fontCache: 'global',
      },
    };
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    const tag = 'mathjax';
    script.id = tag;
    script.async = true;
    const scriptNode = document.getElementById(tag);
    try {
      if (!scriptNode) {
        document.head.appendChild(script);
      } else {
        scriptNode.remove();
        document.head.appendChild(script);
      }
    } catch (error) {}
  }());
};

module.exports = { inject };
