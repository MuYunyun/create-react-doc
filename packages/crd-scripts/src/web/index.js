import ReactDOM from 'react-dom'
import '@babel/polyfill'
import { ifProd, ifPrerender } from 'crd-client-utils'
import RouterRoot from './Router'

const ifProdRender = ifProd && !ifPrerender

if (!ifProdRender) {
  ReactDOM.render(
    <RouterRoot />,
    document.getElementById('root'),
  )
}
