import { Icon } from "@/components/atoms/Icon/Icon";
import { Input } from "@/components/atoms/Input/Input";
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
