import styles from './Search.module.css';

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" name="search" id="search" placeholder="Tìm kiếm" />
      <div className={styles.searchBtn}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Search;
