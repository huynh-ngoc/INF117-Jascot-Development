import Link from "next/link";
import styles from "@/app/userinvestmentstrategies/styles/NavBar.module.css";
import SearchBar from "./SearchBar"; 


export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/locationreport">Location Report</Link></li>
        <li><Link href="/propertyreport">Property Report</Link></li>
        <li className={styles.dropdown}>
          <span>Neighborhood Maps</span>
          <div className={styles.dropdownContent}>
            <Link href="/neighborhood/demographics">Neighborhood Demographics</Link>
            <Link href="/neighborhood/salecomps">Sale Comparisons</Link>
          </div>
        </li>
        <li><Link href="/userinvestmentstrategies">Investor Profile</Link></li>
      </ul>
      <SearchBar /> 
    </nav>
  );
}
