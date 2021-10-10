// The position of current index.js should be kept.
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './index.less'

const {{name}} = ({routeData, menuSource}) => {
  return (
    <div className={styles.center}>
      <Switch>
        <Redirect exact from="/" to="/Introduction/hello_world" />
        {routeData.map((item) => {
          const Comp = item.component
          return (
            <Route
              key={item.path}
              exact
              path={item.path}
              render={() => <Comp {...item} />}
            />
          )
        })}
      </Switch>
    </div>
  )
}

export default {{name}}
