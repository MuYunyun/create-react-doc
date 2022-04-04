import { hydrate } from 'react-dom'
import { renderToString } from 'react-dom/server';
// import { hydrateRoot } from 'react-dom/client'
import '@babel/polyfill'
import { ifDev, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

if (ifDev) {
  // dev render
  document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
  hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
  // hydrateRoot(
  //   document.getElementById('root'),
  //   <RouterRoot />,
  // )
} else if (ifPrerender) {
  // prerender
  document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
} else {
  // prod render:
  // It'll cause some [unkown error](https://github.com/MuYunyun/create-react-doc/issues/278) using hydrateRoot here.
  // So still using hydrate temporarily.
  hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
  // hydrateRoot(
  //   document.getElementById('root'),
  //   <RouterRoot />,
  // )
}
