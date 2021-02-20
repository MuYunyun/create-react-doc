import isClient from 'diana/lib/isClient'

/** judge if is in mobile */
const isMobile = isClient() ? 'ontouchend' in window : false

// eslint-disable-next-line no-undef
const ifProd = env === 'prod'
const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender
// decide to if add prefix for path, eg: '/' or '/${repo}'
const ifAddPrefix = ifProd && !ifPrerender

export { isMobile, ifAddPrefix }
