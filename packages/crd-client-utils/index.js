const ifDev = env === 'dev'
const ifProd = env === 'prod'
const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender

export {
  ifDev,
  ifProd,
  ifPrerender
}
