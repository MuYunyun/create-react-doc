import styles from './index.less'

const Tags = ({}) => {
  const { user, repo } = DOCSCONFIG || {}

  console.log('tagsArr', tagsArr)

  return (
    <div className={styles.tags}>
      <div className={styles['tags-title']}>tags</div>
      <div className={styles['tags-content']}>
        {
          tagsArr.map(tag => {
            return <a className={styles['tags-text']}>{tag}</a>
          })
        }
      </div>
    </div>
  )
}

export default Tags
