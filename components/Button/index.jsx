import styles from './index.less'

const Button = ({
  children,
}) => {
  return <button className={styles.btn}>{children}</button>
}

export default Button
