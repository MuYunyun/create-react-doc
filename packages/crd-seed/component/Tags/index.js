import { Link } from 'react-router-dom'
import { ifProd } from 'crd-client-utils'
import styles from './index.less'

const Tags = ({ name }) => {
  const { user, repo } = DOCSCONFIG || {}

  return (
    <div className={styles.tags}>
      <div className={styles['tags-title']}>{name || 'Tags'}</div>
      <div className={styles['tags-content']}>
        {
          name
            ? mapTagsWithArticle.find(({ tagName }) => tagName === name)?.mapArticle.map(({ path, title }) => {
              return <Link
                className={styles['tags-text']}
                // todo
                to={ifProd ? `/${repo}/${path}` : `/${path}`}
                key={title}
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
