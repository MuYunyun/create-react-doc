import { renderToPipeableStream } from 'react-dom'
import { hydrateRoot } from 'react-dom/client'
import ReactDOMServer from 'react-dom/server';
import '@babel/polyfill'
import { ifDev, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

if (ifDev) {
  // dev render
  document.getElementById('root').innerHTML = renderToPipeableStream(<RouterRoot />)
  hydrateRoot(
    document.getElementById('root'),
    <RouterRoot />,
  )
} else if (ifPrerender) {
  // prerender
  document.getElementById('root').innerHTML = renderToPipeableStream(<RouterRoot />)
} else {
  // prod render:
  hydrateRoot(
    document.getElementById('root'),
    <RouterRoot />,
  )
}
