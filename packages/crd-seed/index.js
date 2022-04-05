import { Routes, Route, Navigate } from 'react-router-dom'
import BasicLayout from './layout'
import NoMatch from './component/NoMatch'
import './index.less'

// run in the Web/Router.js
const ThemeSeed = (props) => {
  return (
    <Routes>
      <Route path="/*" element={<BasicLayout {...props} />} />
      <Route path="/404" element={<NoMatch />} />
    </Routes>
  )
}

export default ThemeSeed
