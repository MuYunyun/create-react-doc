import cx from 'classnames'
import styles from './index.less'

const version = VERSION; // eslint-disable-line
const footer = FOOTER; // eslint-disable-line

const FooterView = ({ inlineCollapsed }) => {
  return (
    <div
      className={cx(styles.footer, {
        [`${styles['footer-inlineCollapsed']}`]: inlineCollapsed,
      })}
    >
      {footer ? (
        <div dangerouslySetInnerHTML={{ __html: footer }} />
      ) : (
        <>
          <div className={styles.powered_by}>
            {`Powered by${' '}`}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MuYunyun/create-react-doc"
            >
              Create React Doc
            </a>
            .
          </div>
          <div>
            <i className="fa fa-user" /><span className={styles.uv_count} id="busuanzi_value_site_uv" />
            <span className={styles.split}>|</span>
            <i className="fa fa-eye" /><span className={styles.pv_count} id="busuanzi_value_site_pv" />
          </div>
        </>

      )}
    </div>
  )
}

export default FooterView
