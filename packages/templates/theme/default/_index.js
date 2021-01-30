// The position of current index.js should be kept.
import { Switch, Route } from 'react-router-dom'
import './index.less'

const {{name}} = (props) => {
  return (
    <Switch>
      <Route
        path="/"
        render={(routeProps) => {
          return <div>Your Custom Theme</div>
        }}
      />
    </Switch>
  )
}

export default {{name}}
