import styles from "@/app/userinvestmentstrategies/styles/SearchBar.module.css";

export default function SearchBar() {
  return (
    <form className={styles.searchForm}>
      <input 
        type="text" 
        placeholder="Search for a neighborhood, property, or location..." 
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
}
