// The position of current index.js should be kept.
import { Switch, Route } from 'react-router-dom'
import styles from './index.less'

const {{name}} = (props) => {
  return (
    <Switch>
      <Route
        path="/"
        render={(routeProps) => <div className={styles.center}>Your Custom Theme</div>}
      />
    </Switch>
  )
}

export default {{name}}
