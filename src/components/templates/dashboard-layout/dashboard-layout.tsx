import type { ReactNode } from "react";

import styles from "./dashboard-layout.module.scss";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className={styles.layout}>
      <aside className={styles.sidebar}>Dashboard Menu</aside>
      <section>{children}</section>
    </main>
  );
};
