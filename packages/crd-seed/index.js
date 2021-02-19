import { Switch, Route } from 'react-router-dom'
import BasicLayout from './layout'
import NoMatch from './component/NoMatch'
import './index.less'

// run in the Web/Router.js
const ThemeSeed = (props) => {
  // eslint-disable-next-line no-undef
  const { repo } = DOCSCONFIG || {}
  // eslint-disable-next-line no-undef
  const ifProd = env === 'prod'
  return (
    <Switch>
      <Route
        path={ifProd ? `/${repo}/404` : `/404`}
        render={routeProps => <NoMatch {...routeProps} {...props} />}
      />
      <Route
        path={ifProd ? `/${repo}` : '/'}
        render={(routeProps) => {
          return <BasicLayout {...routeProps} {...props} />
        }}
      />
    </Switch>
  )
}

export default ThemeSeed
