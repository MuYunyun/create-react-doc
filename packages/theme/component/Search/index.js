import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import styles from './index.less';

const { useState, useEffect } = React;

const Search = ({
  placeholder = 'Search',
  className,
}) => {
  const [value, setValue] = useState('');
  const [searchContent, setSearchContent] = useState([]);
  const showSearchContent = value.length > 0 && searchContent.length > 0;
  useEffect(() => {
    /* eslint-disable-next-line no-undef */
    if (SEARCHCONTENT) {
      /* eslint-disable-next-line no-undef */
      const filterSearch = SEARCHCONTENT.filter((r) => {
        return r.title.includes(value) || r.content.includes(value);
      });
      setSearchContent(filterSearch);
    }
  }, [value]);
  return (
    <div className={cx(styles.search, className)}>
      <Icon type="search" size="14" />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {showSearchContent ? (
        <ul className={styles.panel}>
          {searchContent.map((search) => {
            return (
              <li
                className={styles.searchItem}
                onClick={() => {
                  location.hash = search.url;
                }}
                key={search.url}
              >
                <span className={styles.title}>{search.title}</span>
                <span className={styles.content}>{search.content}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
