import { Switch, Route } from 'react-router-dom'
import BasicLayout from './layout'
import NoMatch from './component/NoMatch'
import './index.less'

// run in the Web/Router.js
const ThemeSeed = (props) => {
  return (
    <Switch>
      <Route path="/404">
        <NoMatch />
      </Route>
      <Route path="/">
        <BasicLayout {...props} />
      </Route>
    </Switch>
  )
}

export default ThemeSeed
