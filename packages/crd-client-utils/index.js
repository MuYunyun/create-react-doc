const ifProd = env === 'prod'
const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender

export { ifProd, ifPrerender }
