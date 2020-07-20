import React from 'react';
// import cx from 'classnames';
import Icon from '../Icon';
import styles from './index.less';

const Search = ({
  placeholder = 'Search',
}) => {
  return (
    <div className={styles.search}>
      <Icon type="search" size="14" />
      <input placeholder={placeholder} />
    </div>
  );
};

export default Search;
