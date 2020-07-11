import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';

const Footer = () => {
  return (
    <table className={styles.noMatch}>
      <tbody>
        <tr>
          <td>
            <h1>404</h1>
            <div>杯具啊！页面不存在 </div>
            <Link className={styles.button} to="/">返回首页</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Footer;
