import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import styles from './index.less';

const Search = ({
  placeholder = 'Search',
  className,
  value,
  onChange,
}) => {
  // eslint-disable-next-line no-undef
  // console.log('abcdefg', SEARCHCONTENT);
  return (
    <div className={cx(styles.search, className)}>
      <Icon type="search" size="14" />
      <input placeholder={placeholder} value={value} onChange={onChange} />
      <ul className={styles.panel}>
        {/* eslint-disable-next-line no-undef */}
        {SEARCHCONTENT.map((search) => {
          return (
            <li className={styles.searchItem}>
              <span className={styles.title}>{search.title}</span>
              <span className={styles.content}>{search.content}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
