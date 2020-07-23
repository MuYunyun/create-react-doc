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
      <ul className={styles.panel}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>
  );
};

export default Search;
