import type { ReactNode } from "react";

import { ShellLayout } from "@/components/templates/ShellLayout/ShellLayout";

import styles from "./AuthLayout.module.scss";

type AuthLayoutProps = {
  children: ReactNode;
  clientKey?: string;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <ShellLayout>
      <main className={styles.layout}>{children}</main>
    </ShellLayout>
  );
};
