import ReactDOM from 'react-dom'
// import ReactDOMServer from 'react-dom/server';
import '@babel/polyfill'
import { ifDev, ifProd, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

const ifProdRender = ifProd && !ifPrerender

if (ifDev) {
  // dev render
  ReactDOM.render(
    <RouterRoot />,
    document.getElementById('root'),
  )
} else if (!ifProdRender) {
  // prerender
  ReactDOM.render(
    <RouterRoot />,
    document.getElementById('root'),
  )
} else {
  // prod render: render like ReactDOM.hydrate()
  ReactDOM.render(
    <RouterRoot pointRender="menu" />,
    document.getElementById('menuPosition'),
  )
}
