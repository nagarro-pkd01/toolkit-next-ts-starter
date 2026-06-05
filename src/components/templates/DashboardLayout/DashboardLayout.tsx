import type { ReactNode } from "react";

import { ShellLayout } from "@/components/templates/ShellLayout/ShellLayout";

import styles from "./DashboardLayout.module.scss";

type DashboardLayoutProps = {
  children: ReactNode;
  clientKey?: string;
};

export const DashboardLayout = ({ children, clientKey }: DashboardLayoutProps) => {
  return (
    <ShellLayout clientKey={clientKey} layoutId="dashboard">
      <div className={styles.layout}>
        <aside className={styles.sidebar}>Dashboard Menu</aside>
        <section>{children}</section>
      </div>
    </ShellLayout>
  );
};
