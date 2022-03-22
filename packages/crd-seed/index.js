import { Switch, Route } from 'react-router-dom'
import BasicLayout from './layout'
import NoMatch from './component/NoMatch'
import Tags from './component/Tags'
import './index.less'

// run in the Web/Router.js
const ThemeSeed = (props) => {
  return (
    <Switch>
      <Route
        path="/404"
        render={routeProps => <NoMatch {...routeProps} {...props} />}
      />
      <Route
        path="/tags"
        render={routeProps => <Tags {...routeProps} {...props} />}
      />
      <Route
        path="/"
        render={(routeProps) => {
          return <BasicLayout {...routeProps} {...props} />
        }}
      />
    </Switch>
  )
}

export default ThemeSeed
