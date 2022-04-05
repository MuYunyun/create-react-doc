// The position of current index.js should be kept.
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './index.less'

const {{name}} = ({routeData, menuSource}) => {
  return (
    <div className={styles.center}>
      <Routes>
        <Route
          path='/'
          element={<Navigate to="/Introduction/hello_world" replace />}
        />
        {routeData.map((item) => {
          const Comp = item.component
          return (
            <Route
              key={item.path}
              path={item.path}
              element={<Comp {...item} />}
            />
          )
        })}
      </Routes>
    </div>
  )
}

export default {{name}}
