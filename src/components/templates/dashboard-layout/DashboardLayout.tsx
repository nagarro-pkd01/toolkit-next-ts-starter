import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { ShellLayout } from "@/components/templates/shell-layout/ShellLayout";
import { FOOTER_CONFIG, HEADER_CONFIG, resolveLayoutShellOptions } from "@/constants/layoutConfig";

import styles from "./DashboardLayout.module.scss";

type DashboardLayoutProps = {
  children: ReactNode;
  clientKey?: string;
};

export const DashboardLayout = ({ children, clientKey }: DashboardLayoutProps) => {
  const shell = resolveLayoutShellOptions("dashboard", clientKey);

  return (
    <ShellLayout
      footer={shell.showFooter ? <Footer config={FOOTER_CONFIG} /> : undefined}
      header={shell.showHeader ? <Navbar config={HEADER_CONFIG} /> : undefined}
    >
      <div className={styles.layout}>
        <aside className={styles.sidebar}>Dashboard Menu</aside>
        <section>{children}</section>
      </div>
    </ShellLayout>
  );
};
