import styles from './SearchBar.module.scss';

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <input
      value={searchTerm}
      onChange={onSearchTermChange}
      className={styles.searchBar}
      type="text"
      placeholder="Search"
      aria-label="search by artist or album"
    ></input>
  );
};

export { SearchBar };
