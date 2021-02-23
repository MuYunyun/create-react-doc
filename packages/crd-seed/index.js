import { Switch, Route } from 'react-router-dom'
import BasicLayout from './layout'
import NoMatch from './component/NoMatch'
import { ifAddPrefix } from './utils'
import './index.less'

// run in the Web/Router.js
const ThemeSeed = (props) => {
  // eslint-disable-next-line no-undef
  const { repo } = DOCSCONFIG || {}

  return (
    <Switch>
      <Route
        // path={ifAddPrefix ? `/${repo}/404` : `/404`}
        path="/404"
        render={routeProps => <NoMatch {...routeProps} {...props} />}
      />
      <Route
        // path={ifAddPrefix ? `/${repo}` : '/'}
        path="/"
        render={(routeProps) => {
          return <BasicLayout {...routeProps} {...props} />
        }}
      />
    </Switch>
  )
}

export default ThemeSeed
