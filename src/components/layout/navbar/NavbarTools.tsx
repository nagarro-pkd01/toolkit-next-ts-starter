"use client";

import { ThemeToggle } from "@/components/molecules/theme-toggle/ThemeToggle";

import styles from "./Navbar.module.scss";

export const NavbarTools = () => (
  <div className={styles.tools}>
    <ThemeToggle />
  </div>
);
