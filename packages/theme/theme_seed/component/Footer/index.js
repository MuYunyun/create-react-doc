import React from 'react';
import cx from 'classnames';
import styles from './index.less';

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
        <div>
          Copyright © 2020 Powered by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MuYunyun/create-react-doc"
          >
            Create React Doc
          </a>
          .
        </div>
      )}
    </div>
  );
};

export default FooterView;
