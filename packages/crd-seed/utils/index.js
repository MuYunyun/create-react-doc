import isClient from 'diana/lib/isClient'
import { ifProd, ifPrerender } from 'crd-client-utils'

/** judge if is in mobile */
const isMobile = isClient() ? 'ontouchend' in window : false

// decide to if add prefix for path, eg: '/' or '/${repo}'
const ifAddPrefix = ifProd && !ifPrerender

export { isMobile, ifAddPrefix }
