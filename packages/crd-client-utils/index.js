import { useLayoutEffect, useEffect } from 'react'

const ifDev = env === 'dev'
const ifProd = env === 'prod'
const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender

const useEnhancedEffect = typeof window !== 'undefined'
  ? useLayoutEffect
  : useEffect

export {
  ifDev,
  ifProd,
  ifPrerender,
  useEnhancedEffect
}
