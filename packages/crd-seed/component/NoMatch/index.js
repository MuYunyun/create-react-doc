// import { Link } from 'react-router-dom'
import styles from './index.less'

const Footer = () => {
  // eslint-disable-next-line no-undef
  const { user, repo } = DOCSCONFIG || {}
  return (
    <table className={styles.noMatch}>
      <tbody>
        <tr>
          <td>
            <h1>404</h1>
            <div>杯具啊！页面不存在 </div>
            <section>在 github 访问<a href={`https://github.com/${user}/${repo}`}>该项目</a></section>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Footer
