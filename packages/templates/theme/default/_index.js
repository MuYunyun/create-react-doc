// The position of current index.js should be kept.
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './index.less'

const {{name}} = (props) => {
  return (
    <div className={styles.center}>
      <Switch>
        <Redirect exact from="/" to="/Introduction/hello_world" />
        {routeData.map((item) => {
          return (
            <Route
              key={item.path}
              exact
              path={item.path}
              render={() => {
                const Comp = item.component
                return <Comp {...item} />
              }}
            />
          )
        })}
      </Switch>
    </div>
  )
}

export default {{name}}
