const inject = () => {
  // demo for using mathjax. see https://github.com/MuYunyun/create-react-doc/issues/63
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
    },
    svg: {
      fontCache: 'global',
    },
  };

  (function () {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    document.head.appendChild(script);
  }());
};

module.exports = { inject };
