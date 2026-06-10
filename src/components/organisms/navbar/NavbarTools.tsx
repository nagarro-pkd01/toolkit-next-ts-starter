"use client";

import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle";

import styles from "./Navbar.module.scss";

export const NavbarTools = () => {
  return (
    <div className={styles.tools}>
      <ThemeToggle />
    </div>
  );
};
