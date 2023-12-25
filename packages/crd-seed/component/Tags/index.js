import { Link, useMatch } from 'react-router-dom'
import { ifProd } from 'crd-client-utils'
import { ifAddPrefix } from '../../utils'
import styles from './index.less'

/**
 * name: the name of tag category.
 */
const Tags = () => {
  const { user, repo } = DOCSCONFIG || {}
  const path = ifAddPrefix ? `/${repo}/tags/:name` : '/tags/:name'
  const routeMatch = useMatch(path) || {}
  const { name } = routeMatch.params || {}

  return (
    <div className={styles.tags}>
      <div className={styles['tags-title']}>{name || 'Tags'}</div>
      <div className={styles['tags-content']}>
        {
          name
            ? mapTagsWithArticle.find(({ tagName }) => tagName === name)?.mapArticle.map(({ path, title }) => {
              return <Link
                className={styles['tags-text']}
                to={ifProd ? `/${repo}${path}` : `${path}`}
                key={path}
              >
                {title}
              </Link>
            })
            : mapTagsWithArticle.map(({ tagName }) => {
              return <Link
                className={styles['tags-text']}
                to={ifProd ? `/${repo}/tags/${tagName}` : `/tags/${tagName}`}
                key={tagName}
              >
                {tagName}
              </Link>
            })
        }
      </div>
    </div>
  )
}

export default Tags
