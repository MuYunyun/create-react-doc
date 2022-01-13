import Markdown from './markdown'
import './index.less'

export default function (Lazyload, props) {
  // routing load component
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
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
