import styles from './index.less'

const Tags = ({}) => {
  const { user, repo } = DOCSCONFIG || {}

  console.log('tagsArr', tagsArr)

  return (
    <div className={styles.tags}>
      <div className={styles['tags-title']}>tags</div>
      <div className={styles['tags-content']}>
        <a className={styles['tags-text']}>Annual Summary</a>
        <a className={styles['tags-text']}>css</a>
        <a className={styles['tags-text']}>ES7</a>
        <a className={styles['tags-text']}>hooks</a>
        <a className={styles['tags-text']}>JavaScript</a>
        <a className={styles['tags-text']}>Mvvm</a>
        <a className={styles['tags-text']}>Node.js</a>
        <a className={styles['tags-text']}>Promise</a>
        <a className={styles['tags-text']}>Python</a>
        <a className={styles['tags-text']}>React</a>
        <a className={styles['tags-text']}>Redux</a>
        <a className={styles['tags-text']}>SEO</a>
        <a className={styles['tags-text']}>Schedule</a>
        <a className={styles['tags-text']}>TypeScript</a>
        <a className={styles['tags-text']}>alfred workflow</a>
        <a className={styles['tags-text']}>blog</a>
      </div>
    </div>
  )
}

export default Tags
