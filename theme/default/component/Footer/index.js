import React from 'react';
import styles from './index.less';

const version = VERSION; // eslint-disable-line
const footer = FOOTER; // eslint-disable-line

const FooterView = () => {
  return (
    <div className={styles.footer}>
      {footer ? <div dangerouslySetInnerHTML={{ __html: footer }} /> : (
        <div>
          Copyright © 2020 Powered by <a target="_blank" rel="noopener noreferrer" href="https://github.com/MuYunyun/create-react-doc">Create React Doc</a>.
        </div>
      )}
    </div>
  );
};

export default FooterView;
