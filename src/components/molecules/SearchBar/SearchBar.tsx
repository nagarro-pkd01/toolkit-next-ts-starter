import { Icon, Input } from "@/components/atoms";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  placeholder?: string;
};

export const SearchBar = ({ placeholder = "Search products" }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <Icon label="search" />
      <Input placeholder={placeholder} />
    </div>
  );
};
