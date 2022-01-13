import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import '@babel/polyfill'
import { ifDev, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

if (ifDev) {
  // dev render
  document.getElementById('root').innerHTML = ReactDOMServer.renderToString(<RouterRoot />)
  ReactDOM.hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
} else if (ifPrerender) {
  // prerender
  document.getElementById('root').innerHTML = ReactDOMServer.renderToString(<RouterRoot />)
} else {
  // prod render:
  ReactDOM.hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
}
