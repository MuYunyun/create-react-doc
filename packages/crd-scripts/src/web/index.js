import ReactDOM from 'react-dom'
import '@babel/polyfill'
import { ifDev, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

if (ifDev) {
  // dev render
  ReactDOM.render(
    <RouterRoot />,
    document.getElementById('root'),
  )
} else if (ifPrerender) {
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
