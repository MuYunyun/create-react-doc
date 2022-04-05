import { BrowserRouter, Route, Routes } from 'react-router-dom'
import theme from 'crd-theme'
import menuSource from './crd.json'

/**
 * serialize router data
 */
function routeData(data, arrayRoute = [], routePath = '/', article) {
  data.forEach((item) => {
    const routePropsCurrent = `${routePath}${item.name}`.replace(/.md$/, '')
    const { mdconf, ...otherItem } = item
    arrayRoute.push({
      path: routePropsCurrent,
      mdconf: mdconf || { title: item.name },
      props: { ...otherItem },
      article: article || item.name,
    })
    if (item.children && item.children.length > 0) {
      arrayRoute.concat(routeData(item.children, arrayRoute, `${routePropsCurrent}/`, article || item.name))
    }
  })
  return arrayRoute
}

function menuSourceFormat(data, routePath, article) {
  const arr = []
  data.forEach((item) => {
    const routePropsCurrent = `${routePath || ''}/${item.name}`.replace(/.md$/, '')
    if (item.type === 'directory') {
      if (item.children && item.children.length > 0) {
        item.title = item.name.replace(item.extension, '')
        item.mdconf = {}
        item.props = { isEmpty: true }
        item.children = menuSourceFormat(item.children, routePropsCurrent, article || item.name)
      } else {
        item.title = item.name.replace(item.extension, '')
        item.mdconf = { title: item.name }
        item.props = { isEmpty: true }
        item.children = []
      }
    } else {
      item.title = item.mdconf && item.mdconf.title ? item.mdconf.title : item.name.replace(item.extension, '')
      if (!item.mdconf) {
        item.props = { isEmpty: true }
      }
    }
    item.routePath = routePropsCurrent
    item.article = article || item.name
    arr.push(item)
  })
  return arr
}

const RoutersContainer = ({ ...props }) => {
  return (
    <Routes>
      <Route
        path="/*"
        element={theme({
          routeData: routeData(menuSource),
          menuSource: menuSourceFormat(menuSource),
          ...props,
        })}
      />
    </Routes>
  )
}

export default function RouterRoot() {
  return (
    <BrowserRouter>
      <RoutersContainer />
    </BrowserRouter>
  )
}
