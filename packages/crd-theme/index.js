// import Loading from './component/Loading'
import Markdown from './routes/Pages'
// import { ifProd, ifPrerender } from './utils'
import './index.less'

export default function (Lazyload, props) {
  /** todo: how to avoid the extra logic */
  // if (ifProd && !ifPrerender) return null
  // const LoadableComponent = Lazyload({
  //   component: () => import('./routes/Pages'),
  //   LoadingComponent: Loading,
  // })

  // routing load component
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
      // item.component = LoadableComponent
      item.component = Markdown
      return item
    })
  }

  // support for custom theme.
  const CustomTheme = require('__project_theme__').default

  return (
    // use custom theme here.
    <CustomTheme {...props} />
  )
}
