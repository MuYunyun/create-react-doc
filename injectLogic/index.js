/* eslint-disable no-empty */
// seo: perf inject logic only once
const inject = () => {
  // SEO for Google through https://search.google.com/search-console/welcome
  const meta = document.createElement('meta')
  meta.name = 'google-site-verification'
  meta.content = '7fyp1NuvXSRLM9KpMq5_YNE_0zFZkPnuV-SbVVFgWbI'
  document.head.appendChild(meta)
}

// perf injectWithPathname logic every pathname changes
const injectWithPathname = (pathname) => {
  // demo for using mathjax. see https://github.com/MuYunyun/create-react-doc/issues/63
  if (pathname !== '/高阶用法') return
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
    },
    svg: {
      fontCache: 'global',
    },
  }
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
  const tag = 'mathjax'
  script.id = tag
  script.async = true
  const scriptNode = document.getElementById(tag)
  try {
    if (!scriptNode) {
      document.head.appendChild(script)
    } else {
      scriptNode.remove()
      document.head.appendChild(script)
    }
  } catch (error) {}
}

module.exports = { inject, injectWithPathname }
