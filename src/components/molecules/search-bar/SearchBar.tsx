import { Icon } from "@/components/atoms/icon/Icon";
import { Input } from "@/components/atoms/input/Input";
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
