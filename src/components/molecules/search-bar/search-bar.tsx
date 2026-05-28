import { Icon, Input } from "@/components/ui";
import styles from "./search-bar.module.scss";

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
