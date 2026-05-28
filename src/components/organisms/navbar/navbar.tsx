import Link from "next/link";

import { SearchBar } from "@/components/molecules/search-bar/search-bar";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Link href="/">Shop</Link>
      <SearchBar />
    </header>
  );
};
