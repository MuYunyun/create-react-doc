import { useLayoutEffect, useEffect } from 'react'

const ifDev = env === 'dev'
const ifProd = env === 'prod'
const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender

// Not only Prod env but also [some part of Dev env](https://github.com/MuYunyun/create-react-doc/blob/main/packages/crd-scripts/src/web/index.js#L10-L13)
// need using useLayoutEffect. If meeting this case in the future, thinking about passing extra tag from <RouterRoot />.
const useEnhancedEffect = ifProd
  ? useLayoutEffect
  : useEffect

export {
  ifDev,
  ifProd,
  ifPrerender,
  useEnhancedEffect
}
