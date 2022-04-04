//
// import { hydrateRoot } from 'react-dom/client'
// import { renderToString } from 'react-dom/server';
// import '@babel/polyfill'
// import { ifDev, ifPrerender } from 'crd-client-utils'
// import RouterRoot from './Router'

// if (ifDev) {
//   // dev render
//   document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
//   hydrateRoot(
//     document.getElementById('root'),
//     <RouterRoot />,
//   )
// } else if (ifPrerender) {
//   // prerender
//   document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
// } else {
//   // prod render:
//   hydrateRoot(
//     document.getElementById('root'),
//     <RouterRoot />,
//   )
// }
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import '@babel/polyfill'
import { ifDev, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

if (ifDev) {
  // dev render
  document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
  hydrateRoot(
    document.getElementById('root'),
    <RouterRoot />,
  )
} else if (ifPrerender) {
  // prerender
  document.getElementById('root').innerHTML = renderToString(<RouterRoot />)
} else {
  // prod render:
  hydrateRoot(
    document.getElementById('root'),
    <RouterRoot />,
  )
}