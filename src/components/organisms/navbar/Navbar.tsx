import Link from "next/link";

import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";
import { NavbarTools } from "@/components/organisms/navbar/NavbarTools";
import type { HeaderConfig } from "@/constants/layoutConfig";

import styles from "./Navbar.module.scss";

type NavbarProps = {
  config: HeaderConfig;
};

export const Navbar = ({ config }: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <Link href={config.brandHref}>{config.brandLabel}</Link>
      </div>
      <nav aria-label="Main" className={styles.nav}>
        {config.links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        {config.showSearch ? <SearchBar /> : null}
        <NavbarTools />
      </div>
    </header>
  );
};
