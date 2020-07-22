import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import styles from './index.less';

const Search = ({
  placeholder = 'Search',
  className,
}) => {
  return (
    <div className={cx(styles.search, className)}>
      <Icon type="search" size="14" />
      <input placeholder={placeholder} />
      <div className={styles.panel}>panel</div>
    </div>
  );
};

export default Search;
